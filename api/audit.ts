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
<html>

<head>
  <meta charset="UTF-8">
  <title>Audit Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>

<body
  style="margin:0; padding:0; background-color:#242424; color:rgba(255,255,255,0.87); font-family:'Inter',system-ui,Avenir,Helvetica,Arial,sans-serif; line-height:1.5;">
  <div style="max-width:800px; margin:0 auto; padding:40px 20px;">
    <h1
      style="font-size:36px; font-weight:700; color:oklch(0.92 0.0651 74.3695); display:flex; align-items:center; margin-bottom:24px;">
      <img src="${logoUrl}" alt="Logo" style="width:32px; height:32px; margin-right:12px; display:inline-block;">
      PageSense:&nbsp;
      <span style="color:oklch(0.72 0.15 230); font-weight:600; font-size: large; padding-top: 6px;">${url}</span>
    </h1>

    <div
      style="background-color:oklch(0.9911 0 0); color:oklch(0.2435 0 0); border-right:4px solid oklch(0.4341 0.0392 41.9938); border-bottom:4px solid oklch(0.4341 0.0392 41.9938); border-radius:0.5rem; padding:20px; margin-bottom:24px; box-shadow:0 1px 3px 0px hsl(0 0% 0% / 0.1),0 4px 6px -1px hsl(0 0% 0% / 0.1); page-break-inside:avoid; break-inside:avoid-column;">
      <h2
        style="font-size:24px; font-weight:700; margin:0 0 16px; text-decoration:underline; text-decoration-color:oklch(0.92 0.0651 74.3695);">
        Conversion Blockers
      </h2>
      <pre
        style="font-family:'Inter',system-ui,Avenir,Helvetica,Arial,sans-serif; line-height:1.5; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; background-color:oklch(0.9911 0 0); color:oklch(0.2435 0 0); padding:16px; border-radius:6px; margin:0;">
${blockers}
          </pre>
    </div>

    <div
      style="background-color:oklch(0.9911 0 0); color:oklch(0.2435 0 0); border-right:4px solid oklch(0.4341 0.0392 41.9938); border-bottom:4px solid oklch(0.4341 0.0392 41.9938); border-radius:0.5rem; padding:20px; margin-bottom:24px; box-shadow:0 1px 3px 0px hsl(0 0% 0% / 0.1),0 4px 6px -1px hsl(0 0% 0% / 0.1); page-break-inside:avoid; break-inside:avoid-column;">
      <h2
        style="font-size:24px; font-weight:700; margin:0 0 16px; text-decoration:underline; text-decoration-color:oklch(0.92 0.0651 74.3695);">
        Recommendations
      </h2>
      <pre
        style="font-family:'Inter',system-ui,Avenir,Helvetica,Arial,sans-serif; line-height:1.5; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; background-color:oklch(0.9911 0 0); color:oklch(0.2435 0 0); padding:16px; border-radius:6px; margin:0;">
${recommendations}
          </pre>
    </div>

    <div
      style="text-align:center;  padding:20px; border-right:4px solid oklch(0.4341 0.0392 41.9938); border-bottom:4px solid oklch(0.4341 0.0392 41.9938); background-color:oklch(1 0 81.72); border-radius:0.5rem; box-shadow:0 1px 3px 0px hsl(0 0% 0% / 0.1),0 4px 6px -1px hsl(0 0% 0% / 0.1); page-break-inside:avoid; break-inside:avoid-column;">
      <p style=" font-size:18px; font-weight:700; margin:0 0 12px; color:oklch(0.4341 0.0392 41.9938)">
        Elevate Your Landing Pages Instantly!
      </p>
      <a href="https://pagesense.co/templates"
        style="display:inline-block; text-decoration:underline; padding:12px 24px; background-color:oklch(0.92 0.0651 74.3695); color:oklch(0.2435 0 0); font-weight:700; border-radius:0.5rem;">
        Explore Plug-and-Play Templates &rarr;
      </a>
    </div>
  </div>
</body>

</html>


`;

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  console.log("PDF generated successfully");
  return pdfBuffer;
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

export default async function handler(req, res) {
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
    let blockers = "";
    let recommendations = "";

    for (let i = 0; i < result.blockers.length; i++) {
      const blocker = result.blockers[i];
      blockers += `${i === 0 ? "" : "\n"}Issue: ${
        blocker.issue
      }\n\nSuggestions:\n\n${blocker.suggestions.join("\n\n")}\n\n`;
    }

    recommendations = result.recommendations.join("\n\n");

    const pdfBuffer = await generateAuditPDF(url, blockers, recommendations);

    // Send PDF as a download
    console.log("Sending PDF...");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=audit.pdf");
    res.status(200).end(Buffer.from(pdfBuffer));
  } else {
    res.status(405).end();
  }
}
