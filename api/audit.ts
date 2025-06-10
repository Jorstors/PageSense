import OpenAI from "openai";
import Chromium from "@sparticuz/chromium";

// Helper to generate PDF from audit result (serverless safe)
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
    "Checking for local environment... ",
    process.env.LOCAL_ENVIRONMENT
  );
  // Dynamically import the correct puppeteer package
  if (process.env.LOCAL_ENVIRONMENT != null) {
    console.log("Using local environment");
    puppeteer = (await import("puppeteer")).default;
    // Let puppeteer use its default executable path
  } else {
    console.log("Using remote environment");
    puppeteer = (await import("puppeteer-core")).default;
    launchOptions.executablePath = await Chromium.executablePath();
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const logoUrl = `${baseUrl}/BOW-Big.png`;
  console.log("Logo URL:", logoUrl);

  // Add bold to "Issue:" and "Suggestions:" within the Blockers text
  blockers = blockers
    .replace(/Issue:/g, "<b>Issue:</b>")
    .replace(/Suggestions:/g, "<b>Suggestions:</b>");

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
              <span style="font-size:28px; font-weight:bold; color:#393028;">PageSense Audit for ${url}</span>
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
  console.log("PDF generated successfully");
  // Return pdfBuffer for download, and html for email
  return { pdfBuffer, htmlContent };
}

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
    console.error("Audit failed:", error);
    return null;
  }
}

// Send to user's email with Brevo API
async function sendEmail(email: string, htmlContent: string) {
  // Get Brevo API key from environment variables
  console.log("Grabbing Brevo API key...");
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not defined");
    // Throw an error instead of using res
    throw new Error("Email service configuration error");
  }

  // Send email
  console.log("Sending email...");

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
      subject: "🚀 Your landing page audit is ready!",
      htmlContent: htmlContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to send email:", errorText);
    throw new Error("Failed to send email");
  }
}

export default async function handler(req, res) {
  // // Ending early for testing toasts
  // res.status(255).end();
  // return;

  if (req.method === "POST") {
    const recieved = req.body;
    const url = recieved.url;
    const email = recieved.email;
    const subscribe = recieved.subscribe;
    console.log("Received body: ", recieved);
    console.log(url);
    console.log(email);
    console.log(subscribe);

    console.log("Auditing URL:", url);
    const result = await audit(url);

    if (!result) {
      res.status(500).json({ error: "Audit failed" });
      return;
    }
    console.log("Audit result:", result);

    // Parsing result into strings
    console.log("Parsing result into strings...");
    let blockers = "";
    let recommendations = "";

    for (let i = 0; i < result.blockers.length; i++) {
      const blocker = result.blockers[i];
      blockers += `${i === 0 ? "" : "\n"}Issue: ${
        blocker.issue
      }\n\nSuggestions:\n\n${blocker.suggestions.join("\n\n")}\n\n`;
    }

    recommendations = result.recommendations.join("\n\n");

    console.log("Genenerating PDF...");

    const { pdfBuffer, htmlContent } = await generateAuditPDF(
      url,
      blockers,
      recommendations
    );

    // Send to user's email with Brevo API
    try {
      await sendEmail(email, htmlContent);
      console.log("Email sent successfully to:", email);
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // Save email to MailerLite if user subscribed
    // TODO...

    // Send PDF as a download
    console.log("Sending PDF to client...");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=audit.pdf");
    res.status(200).end(Buffer.from(pdfBuffer));
  } else {
    res.status(405).end();
  }
}
