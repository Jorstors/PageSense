import OpenAI from "openai";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

async function getExecutablePath() {
  console.debug("[getExecutablePath] Checking environment...");
  if (process.env.LOCAL_ENVIRONMENT != null) {
    console.debug(
      "[getExecutablePath] Detected LOCAL_ENVIRONMENT, using puppeteer executablePath."
    );
    const puppeteerPkg = await import("puppeteer");
    const path = puppeteerPkg.executablePath();
    console.debug(`[getExecutablePath] Puppeteer executablePath: ${path}`);
    return path;
  } else {
    console.debug("[getExecutablePath] Using chromium.executablePath.");
    const path = await chromium.executablePath();
    console.debug(`[getExecutablePath] Chromium executablePath: ${path}`);
    return path;
  }
}

async function fetchPageHTML(url: string): Promise<string> {
  console.debug("[fetchPageHTML] Launching browser...");
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await getExecutablePath(),
    headless: chromium.headless,
  });
  console.debug("[fetchPageHTML] Browser launched.");
  const page = await browser.newPage();
  console.debug(`[fetchPageHTML] Navigating to URL: ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded" });
  console.debug("[fetchPageHTML] Page loaded.");
  const html = await page.content();
  console.debug(`[fetchPageHTML] HTML content fetched. Length: ${html.length}`);
  await browser.close();
  console.debug("[fetchPageHTML] Browser closed.");
  console.log("HTML:", html);
  return html;
}

async function audit(url: string) {
  // Fetch the HTML content of the page
  console.log("Fetching HTML...");
  let html;
  try {
    console.debug(`[audit] Calling fetchPageHTML for URL: ${url}`);
    html = await fetchPageHTML(url);
    console.log("Fetched HTML length:", html ? html.length : "undefined");
  } catch (fetchErr) {
    console.error("Error fetching HTML:", fetchErr);
    throw fetchErr;
  }

  // 1. Initialize the client
  let openai;
  try {
    console.debug("[audit] Initializing OpenAI client...");
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.debug("[audit] OpenAI client initialized.");
  } catch (initErr) {
    console.error("Error initializing OpenAI:", initErr);
    throw initErr;
  }

  // 2. Build your chat request
  //    - Replace "gpt-4o-mini-search-preview" with the exact model name.
  //    - Provide a messages array as usual for Chat API calls.
  try {
    const messages = [
      {
        role: "system",
        content: `You are a world‐class conversion rate optimization expert with over a decade of experience auditing and improving landing pages for high‐growth startups and Fortune 500 companies.

    Your advice is so incisive and actionable that it feels like a “cheat code” for boosting conversions. Always:

    • Focus on data‐driven best practices and user psychology.
    • Be incredibly thorough, prioritizing the highest‐impact changes.
    • Output strictly valid JSON matching the user’s schema.
    • Avoid fluff or generic suggestions—each recommendation should be specific, practical, and immediately implementable.

    When given HTML content of a landing page, identify the top 3–5 conversion blockers (e.g., weak headline, poor CTA, layout flaws, load speed issues) and propose exactly three concrete improvements for each. Ensure your JSON is clean and parsable.
    Output strictly valid JSON without any formatting artifacts like triple backticks or markdown syntax.`,
      },
      {
        role: "user",
        content: `Here is the full HTML of the page to audit:\n\n${html}\n\n\n– Identify 3–5 major conversion blockers (headlines, CTAs, layout issues, load speed).\n– Suggest 3 concrete improvements for each blocker.\n\nProvide your response as JSON:\n{\n  "blockers": [\n    {\n      "issue": "Headline is too vague",\n      "suggestions": ["Use benefit-oriented headline", ...]\n    },\n    ...\n  ],\n  "recommendations": ["…", "…"]\n}`,
      },
    ];
    console.debug("[audit] Messages array constructed for OpenAI.");
    console.log(
      "Sending messages to OpenAI:",
      messages.map((m) => m.role)
    );
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });
    console.debug("[audit] Received response from OpenAI.");

    if (
      !response.choices ||
      !response.choices[0] ||
      !response.choices[0].message ||
      !response.choices[0].message.content
    ) {
      console.error("OpenAI response missing expected structure:", response);
      throw new Error("OpenAI response missing expected structure");
    }
    let result;
    try {
      console.debug("[audit] Parsing OpenAI response content as JSON.");
      result = JSON.parse(response.choices[0].message.content);
      console.debug("[audit] OpenAI response parsed successfully.");
    } catch (parseErr) {
      console.error(
        "Error parsing OpenAI response:",
        response.choices[0].message.content
      );
      throw parseErr;
    }
    // Return the result (JSON object)
    console.debug("[audit] Returning audit result.");
    return result;
  } catch (error) {
    console.error("Audit failed:", error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    console.debug(`[handler] Request method: POST`);
    const recieved = await request.json();
    const url = recieved.url;
    const email = recieved.email;
    const subscribe = recieved.subscribe;
    console.debug(`[handler] Received body: ${JSON.stringify(recieved)}`);
    console.log(url);
    console.log(email);
    console.log(subscribe);

    console.log("Auditing URL:", url);
    const result = await audit(url);
    if (!result) {
      console.error("[handler] Audit failed, sending 500.");
      return Response.json({ error: "Audit failed" }, { status: 500 });
    }
    console.log("Audit result:", result);

    // Parsing result into strings
    let blockers = "";
    let recommendations = "";

    for (let i = 0; i < result.blockers.length; i++) {
      const blocker = result.blockers[i];
      blockers += `Issue: ${
        blocker.issue
      }\nSuggestions: ${blocker.suggestions.join(", ")}\n\n`;
    }

    recommendations = result.recommendations.join(", ");

    console.log("Blockers:", blockers);
    console.log("Recommendations:", recommendations);

    console.debug("[handler] Sending 200 response.");
    return Response.json({ message: "Audit request received!" }, { status: 200 });
  } catch (error) {
    console.error("[handler] Error in POST handler:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
