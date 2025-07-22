import OpenAI from "openai";
import admin from "firebase-admin";

// Force dynamic rendering for serverless compatibility
export const dynamic = "force-dynamic";

// CDN URL for Chromium binary - more reliable than @sparticuz/chromium
const CHROMIUM_PATH =
  "https://vomrghiulbmrfvmhlflk.supabase.co/storage/v1/object/public/chromium-pack/chromium-v123.0.0-pack.tar";

if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    console.log("[Firebase] Initializing with project:", process.env.FIREBASE_PROJECT_ID);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    console.log("[Firebase] Initialized successfully");
  } catch (error) {
    console.error("[Firebase] Initialization failed:", error);
  }
}
const db = admin.firestore();

// Helper function to get browser instance based on environment
async function getBrowser() {

  let browser;

  if (process.env.NODE_ENV === "production") {
    console.log("[getBrowser] Using production environment with chromium-min");

    const chromium = await import("@sparticuz/chromium-min").then(
      (mod) => mod.default
    );

    const puppeteerCore = await import("puppeteer-core").then(
      (mod) => mod.default
    );

    const executablePath = await chromium.executablePath(CHROMIUM_PATH);

    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

  } else {
    console.log("[getBrowser] Using local environment with puppeteer");

    const puppeteer = await import("puppeteer").then((mod) => mod.default);

    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
  }

  if (!browser) {
    console.error("[getBrowser] Failed to launch browser.");
    throw new Error("Failed to launch browser");
  }

  console.log("[getBrowser] Browser successfully launched.");
  console.log("[getBrowser] Browser instance:", browser);

  return browser;
}

async function sendHTMLToFirestore(htmlContent: string, email: string, websiteUrl: string, overallScore: number) {
  if (!email) {
    console.error("[sendHTMLToFirestore] Email is required but was not provided");
    return;
  }

  try {
    console.log("[sendHTMLToFirestore] Fetching most recent audit request...");

    // Get the most recent audit request
    const auditRequestsRef = db
      .collection("users")
      .doc(email.toLowerCase())
      .collection("audit_requests");

    const snapshot = await auditRequestsRef
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const auditId = doc.id;

      console.log(`[sendHTMLToFirestore] Found recent audit with ID: ${auditId}, updating...`);

      // Update the existing document instead of creating a new one
      await auditRequestsRef.doc(auditId).update({
        id: auditId,
        html: htmlContent,
        url: websiteUrl,
        score: overallScore,
      });

      console.log(`[sendHTMLToFirestore] Successfully updated audit request ${auditId} with HTML content`);

    } else {
      console.log("[sendHTMLToFirestore] No recent audit request found, creating new document");

      // If no recent audit exists, create a new one
      const newDoc = await auditRequestsRef.add({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`[sendHTMLToFirestore] Created new audit document with ID: ${newDoc.id}`);

      await newDoc.update({
        id: admin.firestore.FieldValue.serverTimestamp(),
        html: htmlContent,
        url: websiteUrl,
        score: overallScore
      })

      console.log(`[sendHTMLToFirestore] Successfully updated audit request ${newDoc.id} with HTML content`)
    }
  } catch (error) {
    // Log the error but don't throw it to prevent interrupting the process
    console.error("[sendHTMLToFirestore] Error updating Firestore:", error);
  }
}


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
 * @param overallScore - The overall score (0-100) for the landing page.
 * @param scoreChartUrl - URL for the chart visualization of the overall score.
 * @param radarChartUrl - URL for the radar chart of category scores.
 * @returns An object containing:
 *   - `pdfBuffer`: The generated PDF as a Buffer.
 *   - `htmlContent`: The HTML string used to generate the PDF (for use in emails).
 *
 * @throws Will throw an error if Puppeteer fails to launch or PDF generation fails.
 */

async function generateAuditPDF(
  url: string,
  blockers: string,
  recommendations: string,
  overallScore: number = 0,
  scoreChartUrl: string = "",
  radarChartUrl: string = "",
  email: string = ""
) {
  let browser;

  try {
    console.log("[generateAuditPDF] Getting browser instance...");
    browser = await getBrowser();

    console.log("[generateAuditPDF] Creating new page...");
    const page = await browser.newPage();    // Get the correct base URL for different Vercel environments
    let baseUrl: string;
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      // Use production domain
      baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    } else if (process.env.VERCEL_URL) {
      // Use deployment URL (preview/branch deployments)
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      // Local development
      baseUrl = "http://localhost:3000";
    }

    const logoUrl = `${baseUrl}/BOW-Big.png`;
    console.log("[generateAuditPDF] Base URL:", baseUrl);
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

<body style="margin:0; padding:0; background:#f9f9f9; color:#333; font-family:'Segoe UI', system-ui, -apple-system, sans-serif; line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" border="0"
          style="background:#fff; margin:40px 0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:32px 32px 16px 32px; text-align:left; border-bottom:1px solid #f0f0f0;">
              <img src="${logoUrl}" alt="Logo" width="36" height="36" style="vertical-align:middle; margin-right:14px; margin-bottom:14px;">
              <span style="font-size:28px; font-weight:600; color:#393028;">PageSense Audit for ${domainName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:50%; padding-right:16px; vertical-align:top;">
                    <h2 style="font-size:22px; color:#393028; border-bottom:1px solid #f0f0f0; padding-bottom:12px; margin-top:0;">Overall Score</h2>
                    <div style="text-align:center;">
                      <div style="font-size:48px; font-weight:700; color:#393028; margin-bottom:12px;">${Math.round(overallScore)}/100</div>
                      ${scoreChartUrl ? `<img src="${scoreChartUrl}" alt="Score Chart" width="200" style="margin:0 auto;">` : ''}
                    </div>
                  </td>
                  <td style="width:50%; padding-left:16px; vertical-align:top;">
                    <h2 style="font-size:22px; color:#393028; border-bottom:1px solid #f0f0f0; padding-bottom:12px; margin-top:0;">Category Breakdown</h2>
                    <div style="text-align:center; margin-top:35px;">
                      ${radarChartUrl ? `<img src="${radarChartUrl}" alt="Category Scores" width="250" style="margin:0 auto;">` : ''}
                    </div>
                  </td>
                </tr>
              </table>

              <h2 style="font-size:22px; color:#393028; border-bottom:1px solid #f0f0f0; padding-bottom:12px; margin-top:32px;">Conversion Blockers</h2>
              <div style="background:#f8f8f8; padding:20px; border-radius:8px; color:#333; font-size:15px; margin-bottom:24px; white-space:pre-wrap; font-family:inherit;">${blockers}</div>

              <h2 style="font-size:22px; color:#393028; border-bottom:1px solid #f0f0f0; padding-bottom:12px; margin-top:36px;">Recommendations</h2>
              <div style="background:#f8f8f8; padding:20px; border-radius:8px; color:#333; font-size:15px; white-space:pre-wrap; font-family:inherit;">${recommendations}</div>

              <div style="margin-top:40px; text-align:center;">
                <a href="https://pagesense.co/templates"
                  style="display:inline-block; color:#fff; background:#393028; padding:14px 28px; border-radius:6px; text-decoration:none; font-weight:600; letter-spacing:0.3px;">Explore Our High Conversion Templates &rarr;</a>
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

    console.log("[generateAuditPDF] sending HTML to firestore...");
    try {
      if (email) {
        await sendHTMLToFirestore(htmlContent, email, url, overallScore);
      } else {
        console.log("[generateAuditPDF] No email provided, skipping Firestore storage");
      }
    } catch (firestoreError) {
      console.error("[generateAuditPDF] Error saving to Firestore, but continuing process:", firestoreError);
      // We continue execution even if Firestore fails
    }

    console.log("[generateAuditPDF] Setting page content...");
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    console.log("[generateAuditPDF] Generating PDF...");
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });

    console.log("[generateAuditPDF] PDF generated successfully, closing browser...");
    await browser.close();

    console.log("[generateAuditPDF] Browser closed successfully");
    // Return pdfBuffer for download, and html for email
    return { pdfBuffer, htmlContent };

  } catch (error) {
    console.error("[generateAuditPDF] Error generating PDF:", error);

    // Ensure browser is closed even if there's an error
    if (browser) {
      try {
        await browser.close();
        console.log("[generateAuditPDF] Browser closed after error");
      } catch (closeError) {
        console.error("[generateAuditPDF] Error closing browser:", closeError);
      }
    }

    throw error;
  }
}


/**
 * Audits a landing page URL using OpenAI's GPT model to identify major conversion blockers
 * and provide actionable recommendations for improvement.
 *
 * This function sends a prompt to the OpenAI Chat API, instructing it to analyze the given
 * landing page URL for conversion optimization. It requests an overall score, category scores,
 * and 3-5 major conversion blockers with priority levels, categories, and specific suggestions
 * for each. The response is expected to be strictly valid JSON with a structured format.
 *
 * @param url - The landing page URL to audit.
 * @returns A Promise resolving to an object containing:
 *   - overallScore: A number from 0-100 representing the overall quality score.
 *   - categoryScores: An object with scores for Content, Technical, UXDesign, and Performance.
 *   - blockers: An array of objects, each with "issue", "priority", "category", and "suggestions" properties.
 *   - recommendations: An array of recommendation strings.
 *   Returns null if the audit fails or the response is invalid.
 */
async function audit(url: string) {
  // 1. Initialize the client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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

        Your advice is so incisive and actionable that it feels like a "cheat code" for boosting conversions. Always:

- Focus on data‐driven best practices and user psychology
- Be incredibly thorough, prioritizing the highest‐impact changes
- Output strictly valid JSON matching the user's schema
- Provide specific, practical, and immediately implementable recommendations
- Categorize issues into Content, Technical, UXDesign, or Performance
- Assign priority levels (Critical, High, Medium, Low) based on impact
- Provide numerical scores (0-100) for different categories of the site
- Ensure your JSON is clean and parsable without any formatting artifacts

When given a landing page URL, analyze its strengths and weaknesses thoroughly. Examine headlines, CTAs, layout, load speed, UX, mobile responsiveness, trust signals, and other key conversion factors.

        Output strictly valid JSON without any formatting artifacts like triple backticks or markdown syntax.`,
        },
        {
          role: "user",
          content: `Analyze the following landing page URL: ${url}.
- Provide an overall conversion optimization score (0-100)
- Break down the score by category (Content, Technical, UXDesign, Performance)
- Identify 3–5 major conversion blockers
- For each blocker, assign a priority level (Critical, High, Medium, Low)
- For each blocker, indicate the category (Content, Technical, UXDesign, Performance)
- Suggest exactly 3 concrete improvements for each blocker
- Add 3-5 general recommendations for further improvement
Provide your response as JSON with the following structure:
{
  "overallScore": number,
  "categoryScores": {
    "Content": number,
    "Technical": number,
    "UXDesign": number,
    "Performance": number
  },
  "blockers": [
    {
      "issue": string,
      "priority": string,
      "category": string,
      "suggestions": [string, string, string]
    }
  ],
  "recommendations": [string, string, string, string, string]
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

    console.log("[checkRateLimit] Querying audit requests for:", email);

    // Query for requests in the last 24 hours
    const snapshot = await auditRequestsRef
      .where("timestamp", ">", oneDayAgo)
      .get();

    console.log("[checkRateLimit] Audits from last 24 hours:", snapshot.size);

    if (snapshot.size >= 3) {
      console.log("[checkRateLimit] Rate limit exceeded for:", email);
      // Block request
      return true;
    }

    // Otherwise log this audit:
    // Create a string timestamp for the document ID
    const docId = Date.now().toString();
    // Use serverTimestamp() as a field value, not as document ID
    const serverTimestamp = admin.firestore.FieldValue.serverTimestamp();

    await auditRequestsRef.doc(docId).set({
      timestamp: serverTimestamp,
    });

    console.log("[checkRateLimit] Audit request logged for:", email);

    return false;
  } catch (error) {
    console.error("[checkRateLimit] Error checking rate limit:", error);
    console.error("[checkRateLimit] Error details:", error.message);

    // If there's a Firebase error, we'll allow the request but log it
    // This prevents Firebase issues from breaking the entire service
    console.warn("[checkRateLimit] Allowing request due to Firebase error");
    return false;
  }
}


/**
 * Handles POST requests to the audit API endpoint.
 *
 * This function receives a JSON payload containing a landing page URL and user email.
 * It performs the following steps:
 * 1. Checks and enforces rate limits for the provided email using Firebase.
 * 2. Audits the landing page URL using OpenAI's GPT model to identify conversion blockers and recommendations.
 * 3. Formats the audit results, generates a PDF report, and sends the report via email using the Brevo API.
 * 4. Returns the generated PDF for optional download by the user.
 *
 * If the rate limit is exceeded, returns a 429 error.
 * If the audit fails or the OpenAI model returns invalid JSON, returns a 500 error.
 * If successful, returns the PDF audit report for optional download.
 *
 * @param request - The incoming HTTP request containing the JSON payload.
 * @returns A Response object with the PDF report or an error message.
 */

export async function POST(request: Request) {
  // // Return early for testing
  // return new Response(null, { status: 200 });

  try {
    const recieved = await request.json();
    const url = recieved.url;
    const email = recieved.email;
    console.log("[handler] Received body: ", recieved);
    console.log(url);
    console.log(email);

    // Use Firebase logs to check audit history, rate limit
    const exceedsRateLimit = await checkRateLimit(email);
    if (exceedsRateLimit) {
      console.log("[handler] Rate limit exceeded.")
      console.log("Exiting audit handler...")
      return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    console.log("[handler] Rate limit check passed.");

    // Audit URL
    console.log("[handler] Auditing URL:", url);
    const result = await audit(url);

    if (!result) {
      console.log("Exiting audit handler...")
      return Response.json({ error: "OpenAI model failed or returned invalid JSON" }, { status: 500 });
    }
    console.log("[handler] Audit result:", result);

    // Parsing result into strings
    console.log("[handler] Parsing result into strings...");
    let blockers = "";
    let recommendations = "";

    // Calculate overall score with fallback
    const overallScore = result.overallScore ||
      (result.categoryScores ?
        Object.values(result.categoryScores).reduce((sum, score) => sum + Number(score), 0) /
        Object.keys(result.categoryScores).length
        : 50); // Default to 50 if no scores available

    // Ensure categoryScores exists
    const categoryScores = result.categoryScores || {
      "Content": 50,
      "Technical": 50,
      "UXDesign": 50,
      "Performance": 50
    };

    // Create score chart URL - using doughnut chart with gradient colors based on score
    const scoreColor = overallScore >= 80 ? '75,192,192' : overallScore >= 60 ? '255,205,86' : overallScore >= 40 ? '255,159,64' : '255,99,132';

    // Create chart configuration as a proper JavaScript object
    const scoreChartConfig = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [Math.round(overallScore), 100 - Math.round(overallScore)],
          backgroundColor: [`rgba(${scoreColor},0.8)`, 'rgba(220,220,220,0.5)'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%', // Chart.js v3 syntax (replaces cutoutPercentage)
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
    };

    // Convert to JSON and encode for URL usage
    const scoreChartUrl = `https://quickchart.io/chart?width=200&height=200&devicePixelRatio=2&format=png&c=${encodeURIComponent(JSON.stringify(scoreChartConfig))}`;

    // Create polar area chart for category scores
    const categories = Object.keys(categoryScores).map(cat => cat === "UXDesign" ? "UX/Design" : cat);
    const scores = Object.values(categoryScores);

    // Generate background colors for each category
    const backgroundColors = [
      'rgba(255, 99, 132, 0.7)',   // Red for Content
      'rgba(54, 162, 235, 0.7)',   // Blue for Technical
      'rgba(255, 206, 86, 0.7)',   // Yellow for UXDesign
      'rgba(75, 192, 192, 0.7)',    // Teal for Performance
    ];

    // Create polar area chart config
    const radarChartConfig = {
      type: "polarArea",
      data: {
        labels: categories,
        datasets: [{
          data: scores,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          borderColor: backgroundColors.map(color => color.replace('0.7', '1'))
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.formattedValue + '%';
              }
            }
          },
          title: {
            display: false
          }
        },
        maintainAspectRatio: true
      }
    };

    // Convert to JSON and encode for URL usage
    const radarChartUrl = `https://quickchart.io/chart?width=250&height=250&devicePixelRatio=2&format=png&c=${encodeURIComponent(JSON.stringify(radarChartConfig))}`;

    // Group blockers by priority
    const criticalBlockers = result.blockers.filter(b => b.priority === "Critical");
    const highBlockers = result.blockers.filter(b => b.priority === "High");
    const mediumBlockers = result.blockers.filter(b => b.priority === "Medium");
    const lowBlockers = result.blockers.filter(b => b.priority === "Low");

    // Helper function to format blockers by priority level
    function formatBlockersByPriority(blockersList, emoji, label, color) {
      let output = "";
      if (blockersList.length > 0) {
        output += `${emoji} <span style='font-weight:700; font-size:16px; color:${color};'>${label}:</span><br><br>`;
        for (const blocker of blockersList) {
          output += `<div style='margin-bottom:20px; padding-bottom:20px; border-bottom:1px dashed #e8e8e8;'>
<div style='background-color:${color}15; padding:8px 10px; border-left:4px solid ${color}; margin-bottom:10px; border-radius:4px; display:flex; align-items:center;'>
<span style='font-weight:700; color:#333; font-size:16px; margin-right:5px;'>Issue:</span> ${blocker.issue}
</div>
<span style='font-weight:700; color:#555; font-size:14px; display:block; margin-top:12px;'>Category:</span> ${blocker.category === "UXDesign" ? "UX/Design" : blocker.category}

<span style='font-weight:700; color:#555; font-size:14px; display:block; margin-top:12px; margin-bottom:6px;'>Suggestions:</span>${blocker.suggestions.map(s => `• ${s}`).join("<br>")}
</div>`;
        }
      }
      return output;
    }

    // Format blockers by priority
    blockers += formatBlockersByPriority(criticalBlockers, "🔴", "CRITICAL ISSUES", "#e53e3e");
    blockers += formatBlockersByPriority(highBlockers, "🟠", "HIGH PRIORITY", "#ed8936");
    blockers += formatBlockersByPriority(mediumBlockers, "🟡", "MEDIUM PRIORITY", "#d69e2e");
    blockers += formatBlockersByPriority(lowBlockers, "🟢", "LOW PRIORITY", "#38a169");

    // Format recommendations as bullet points with styling
    recommendations = result.recommendations.map(rec => `<div style='margin-bottom:16px; padding-bottom:16px; border-bottom:1px dashed #e8e8e8;'>• ${rec}</div>`).join("<br>");

    console.log("[handler] Genenerating PDF...");

    const { pdfBuffer, htmlContent } = await generateAuditPDF(
      url,
      blockers,
      recommendations,
      overallScore,
      scoreChartUrl,
      radarChartUrl,
      email
    );

    // Send to user's email with Brevo API
    try {
      await sendEmail(email, htmlContent, url);
      console.log("[handler] Email sent successfully to:", email);
    } catch (error) {
      console.error("[handler] Error sending email:", error);
    }

    // Send PDF for optional download
    console.log("[handler] Sending PDF to client...");
    console.log("Exiting audit handler...");

    return new Response(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=audit.pdf",
      },
    });
  } catch (error) {
    console.error("[handler] Error in POST handler:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
