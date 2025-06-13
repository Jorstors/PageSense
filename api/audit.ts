/**
 * API route handler for auditing a landing page, generating a PDF report, and emailing the results.
 *
 * - Accepts POST requests with a JSON body containing:
 *   - `url`: The landing page URL to audit.
 *   - `email`: The user's email address to send the audit report.
 *   - `subscribe`: Boolean indicating if the user wants to subscribe (not yet implemented).
 * - Enforces rate limiting per email address using Firebase.
 * - Uses OpenAI to analyze the landing page and generate audit results.
 * - Generates a PDF report of the audit using Puppeteer and Chromium.
 * - Sends the audit report via email using the Brevo API.
 * - Returns the PDF as a downloadable response.
 *
 * @param req - The HTTP request object (expects POST with JSON body).
 * @param res - The HTTP response object.
 * @returns Sends a PDF file as a response or an error status.
 */

import OpenAI from "openai";
import Chromium from "@sparticuz/chromium";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newlines with real newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
const db = admin.firestore();


// Helper to generate PDF from audit result (serverless safe)

/**
 * Generates a PDF audit report for a given landing page URL, including conversion blockers and recommendations.
 *
 * This function uses Puppeteer (or Puppeteer-core with a custom Chromium binary in serverless environments)
 * to render an HTML report and export it as a PDF. The report includes the provided blockers and recommendations,
 * formatted for clarity and professionalism. The function also returns the HTML content used for the PDF,
 * which can be reused for email delivery.
 *
 * @param url - The landing page URL being audited.
 * @param blockers - A string containing the main conversion blockers, formatted for display.
 * @param recommendations - A string containing actionable recommendations, formatted for display.
 * @returns An object containing:
 *   - `pdfBuffer`: The generated PDF as a Buffer.
 *   - `htmlContent`: The HTML string used to generate the PDF (for use in emails).
 *
 * @throws Will throw an error if Puppeteer fails to launch or PDF generation fails.
 */

async function generateAuditPDF(
  url: string,
  blockers: string,
  recommendations: string
) {
  let puppeteer;
  let launchOptions: any = {
    args: Chromium.args,
    defaultViewport: Chromium.defaultViewport,
    headless: Chromium.headless,
  };
  console.log(
    "[generateAuditPDF] Checking for local environment... ",
    process.env.LOCAL_ENVIRONMENT
  );
  // Dynamically import the correct puppeteer package
  if (process.env.LOCAL_ENVIRONMENT != null) {
    console.log("[generateAuditPDF] Using local environment");
    puppeteer = (await import("puppeteer")).default;
    // Let puppeteer use its default executable path
  } else {
    console.log("[generateAuditPDF] Using remote environment");
    puppeteer = (await import("puppeteer-core")).default;
    launchOptions.executablePath = await Chromium.executablePath();
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const logoUrl = `${baseUrl}/BOW-Big.png`;
  console.log("[generateAuditPDF] Logo URL:", logoUrl);

  // Add bold to "Issue:" and "Suggestions:" within the Blockers text
  blockers = blockers
    .replace(/Issue:/g, "<b>Issue:</b>")
    .replace(/Suggestions:/g, "<b>Suggestions:</b>");

  // Extract domain name from URL, fallback to input if not a valid URL
  let domainName: string;
  try {
    domainName = new URL(url).hostname;
    console.log("[generateAuditPDF] Extracted domain name:", domainName);
  } catch {
    // If url is not a valid URL, use as-is (e.g., "domain.other")
    domainName = url.replace(/https?:\/\//, "").split("/")[0];
    console.log("[generateAuditPDF] Using fallback domain name:", domainName);
  }

  const htmlContent = `
<!DOCTYPE html>
<html>

<body style="margin:0; padding:0; background:#f9f9f9; color:#222; font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="background:#fff; margin:40px 0; border-radius:8px; box-shadow:0 2px 8px #eee;">
          <tr>
            <td style="padding:32px 24px 16px 24px; text-align:left;">
              <img src="${logoUrl}" alt="Logo" width="32" height="32" style="vertical-align:middle; margin-right:12px;">
              <span style="font-size:28px; font-weight:bold; color:#393028;">PageSense Audit for ${domainName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px;">
              <h2 style="font-size:20px; color:#393028; border-bottom:1px solid #eee; padding-bottom:8px;">Conversion
                Blockers</h2>
              <pre
                style="white-space:pre-wrap; font-family:inherit; background:#f4f4f4; padding:12px; border-radius:4px; color:#222;">${blockers}</pre>
              <h2
                style="font-size:20px; color:#393028; border-bottom:1px solid #eee; padding-bottom:8px; margin-top:24px;">
                Recommendations</h2>
              <pre
                style="white-space:pre-wrap; font-family:inherit; background:#f4f4f4; padding:12px; border-radius:4px; color:#222;">${recommendations}</pre>
              <div style="margin-top:32px; text-align:center;">
                <a href="https://pagesense.co/templates"
                  style="display:inline-block; color:#393028; padding:12px 24px; border-radius:4px; text-decoration:none; font-weight:bold;">Explore
                  Our High Conversion Templates &rarr;</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>

`;

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  console.log("[generateAuditPDF] PDF generated successfully");
  // Return pdfBuffer for download, and html for email
  return { pdfBuffer, htmlContent };
}


/**
 * Audits a landing page URL using OpenAI's GPT model to identify major conversion blockers
 * and provide actionable recommendations for improvement.
 *
 * This function sends a prompt to the OpenAI Chat API, instructing it to analyze the given
 * landing page URL for 3–5 major conversion blockers (such as headline issues, CTA problems,
 * layout flaws, or load speed issues). For each blocker, it requests three concrete, practical
 * suggestions for improvement. The response is expected to be strictly valid JSON, containing
 * an array of blockers (with issues and suggestions) and a list of general recommendations.
 *
 * @param url - The landing page URL to audit.
 * @returns A Promise resolving to an object containing:
 *   - blockers: An array of objects, each with an "issue" string and a "suggestions" string array.
 *   - recommendations: An array of recommendation strings.
 *   Returns null if the audit fails or the response is invalid.
 */
async function audit(url: string) {
  // 1. Initialize the client
  const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
  });

  // 2. Build chat request
  //    - Provide a messages array as usual for Chat API calls.
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-search-preview",
      messages: [
        {
          role: "system",
          content: `You are a world‐class conversion rate optimization expert with over a decade of experience auditing and improving landing pages for high‐growth startups and Fortune 500 companies.

        Your advice is so incisive and actionable that it feels like a “cheat code” for boosting conversions. Always:

Focus on data‐driven best practices and user psychology.

Be incredibly thorough, prioritizing the highest‐impact changes.

Output strictly valid JSON matching the user’s schema.

Avoid fluff or generic suggestions—each recommendation should be specific, practical, and immediately implementable.

When given a landing page URL, identify the top 3–5 conversion blockers (e.g., weak headline, poor CTA, layout flaws, load speed issues) and propose exactly three concrete improvements for each. Ensure your JSON is clean and parsable.

        Output strictly valid JSON without any formatting artifacts like triple backticks or markdown syntax.`,
        },
        {
          role: "user",
          content: `Analyze the following landing page URL: ${url}.
- Identify 3–5 major conversion blockers (headlines, CTAs, layout issues, load speed).
- Suggest 3 concrete improvements for each blocker.
Provide your response as JSON:
{
  "blockers": [
    {
      "issue": "Headline is too vague",
      "suggestions": ["Use benefit-oriented headline", ...]
    },
    ...
  ],
  "recommendations": ["…", "…"]
}`,
        },
      ],
    });

    // Grab the response
    const result = JSON.parse(response.choices[0].message.content);
    // Return the result (JSON object)
    return result;
  } catch (error) {
    console.error("[audit] Audit failed:", error);
    return null;
  }
}

// Send to user's email with Brevo API
/**
 * Sends an audit report email to the specified user using the Brevo API.
 *
 * This function composes and sends an email containing the audit report HTML to the user's email address.
 * The subject line includes the audited domain name. Uses the Brevo transactional email API for delivery.
 *
 * @param email - The recipient's email address.
 * @param htmlContent - The HTML content of the audit report to be sent in the email body.
 * @param url - The audited landing page URL (used to extract the domain name for the subject).
 * @throws Will throw an error if the Brevo API key is missing or if the email fails to send.
 */

async function sendEmail(email: string, htmlContent: string, url: string) {
  // Get Brevo API key from environment variables
  console.log("[sendEmail] Grabbing Brevo API key...");
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error("[sendEmail] BREVO_API_KEY is not defined");
    // Throw an error instead of using res
    throw new Error("[sendEmail] Email service configuration error");
  }

  // Send email
  console.log("[sendEmail] Sending email...");

  // Extract domain name from URL, fallback to input if not a valid URL
  let domainName: string;
  try {
    domainName = new URL(url).hostname;
    console.log("[sendEmail] Extracted domain name:", domainName);
  } catch {
    // If url is not a valid URL, use as-is (e.g., "domain.other")
    domainName = url.replace(/https?:\/\//, "").split("/")[0];
    console.log("[sendEmail] Using fallback domain name:", domainName);
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "PageSense",
        email: "info@pagesense.co",
      },
      to: [{ email }],
      subject: `🚀 Your ${domainName} audit is ready!`,
      htmlContent: htmlContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[sendEmail] Failed to send email:", errorText);
    throw new Error("Failed to send email");
  }
}

// Check and enforce rate limits on email w/ Firebase


async function checkRateLimit(email: string) {
  if (!db) {
    console.warn(
      "[checkRateLimit] Firebase not initialized. Cannot check rate limit."
    );
    // If Firebase is not initialized, allow requests
    return false;
  }

  const now = Date.now();
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000); // Date object

  try {
    // Reference to the user's audit_requests subcollection
    const auditRequestsRef = db
      .collection("users")
      .doc(email.toLowerCase())
      .collection("audit_requests");

    // Query for requests in the last 24 hours
    const snapshot = await auditRequestsRef
      .where("timestamp", ">", oneDayAgo)
      .get();

      console.log("[checkRateLimit] Audits from last 24 hours:", snapshot.size);


    if (snapshot.size >= 3) {
      // Block request
      return true;
    }

    // Otherwise log this audit:
    await auditRequestsRef.add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("[checkRateLimit] Audit request logged for:", email);

    return false;
  } catch (error) {
    console.error("[checkRateLimit] Error checking rate limit:", error);
    return false;
  }
}


export default async function handler(req, res) {

  if (req.method === "POST") {
    const recieved = req.body;
    const url = recieved.url;
    const email = recieved.email;
    const subscribe = recieved.subscribe;
    console.log("[handler] Received body: ", recieved);
    console.log(url);
    console.log(email);
    console.log(subscribe);

    // Use Firebase logs to check audit history, rate limit
    const exceedsRateLimit = await checkRateLimit(email);
    if (exceedsRateLimit)
    {
      console.log("[handler] Rate limit exceeded.")
      console.log("Exiting audit handler...")
      res.status(429).json({ error: "Rate limit exceeded" });
      return;
    }
    console.log("[handler] Rate limit check passed.");

    // Ending early for testing firebase
      console.log("Exiting audit handler...")
      res.status(255).end();
      return;

    // Audit URL

    console.log("[handler] Auditing URL:", url);
    const result = await audit(url);

    if (!result) {
      console.log("Exiting audit handler...")
      res.status(500).json({ error: "OpenAI model failed or returned invalid JSON"}).end();
      return;
    }
    console.log("[handler] Audit result:", result);

    // Parsing result into strings
    console.log("[handler] Parsing result into strings...");
    let blockers = "";
    let recommendations = "";

    for (let i = 0; i < result.blockers.length; i++) {
      const blocker = result.blockers[i];
      blockers += `${i === 0 ? "" : "\n"}Issue: ${
        blocker.issue
      }\n\nSuggestions:\n\n${blocker.suggestions.join("\n\n")}\n\n`;
    }

    recommendations = result.recommendations.join("\n\n");

    console.log("[handler] Genenerating PDF...");

    const { pdfBuffer, htmlContent } = await generateAuditPDF(
      url,
      blockers,
      recommendations
    );

    // Send to user's email with Brevo API
    try {
      await sendEmail(email, htmlContent, url);
      console.log("[handler] Email sent successfully to:", email);
    } catch (error) {
      console.error("[handler] Error sending email:", error);
    }

    // Save email to MailerLite if user subscribed
    // TODO...

    // Send PDF as a download
    console.log("[handler] Sending PDF to client...");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=audit.pdf");
    res.status(200).end(Buffer.from(pdfBuffer));
  } else {
    res.status(405).end();
  }
}
