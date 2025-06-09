import OpenAI from "openai";

async function audit(url: string) {
  // 1. Initialize the client
  const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
  });

  // 2. Build your chat request
  //    - Replace "gpt-4o-mini-search-preview" with the exact model name.
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
      blockers += `Issue: ${
        blocker.issue
      }\nSuggestions: ${blocker.suggestions.join(", ")}\n\n`;
    }

    recommendations = result.recommendations.join(", ");

    console.log("Blockers:", blockers);
    console.log("Recommendations:", recommendations);

    res.status(200).json({ message: "Audit request received!" });
  } else {
    res.status(405).end();
  }
}
