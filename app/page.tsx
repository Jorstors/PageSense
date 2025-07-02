import { Feature } from "@/components/Feature";
import { Hero } from "@/components/hero";
import { getMetadata, generateJSONLD } from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "AI-Powered Website Audit Tool",
    description:
      "Automatically analyze and improve your website's SEO, accessibility, and performance with Pagesense's AI-powered audit tool.",
    path: "/",
    keywords: [
      "website analysis",
      "automated testing",
      "SEO optimization",
      "website performance",
      "accessibility testing",
      "AI website audit",
    ],
  });

  // SEO: Add JSON-LD structured data for homepage
  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/",
    },
    other: {
      "script:ld+json": [
        generateJSONLD({
          type: "Organization",
          data: {
            name: "Pagesense",
            url: "https://pagesense.co",
            logo: "https://pagesense.co/WOB-Big.png",
            description: "AI-powered website audit and optimization tool",
          },
        }),
        generateJSONLD({
          type: "WebSite",
          data: {
            name: "Pagesense",
            url: "https://pagesense.co",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://pagesense.co/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        }),
      ],
    },
  };
};

export default function Main() {
  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <Hero />
      <Feature />
    </div>
  );
}
