import { About as AboutComp } from "@/components/about";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "About Pagesense",
    description:
      "Learn about Pagesense, the AI-powered website audit platform that helps businesses optimize conversions. Use it without an account or sign up to save your audit history.",
    path: "/about",
    keywords: [
      "about pagesense",
      "website audit platform",
      "AI audit tool",
      "conversion rate optimization",
      "web optimization",
      "digital analysis tool",
      "website improvement platform",
    ],
  });

  const jsonLd = generateJSONLD({
    type: "WebPage",
    name: "Pagesense | About",
    description:
      "Learn about Pagesense's mission to revolutionize conversion rate optimization with AI technology.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["about"]);

  return {
    ...metadata,
    title: "Pagesense | About",
    openGraph: {
      title: "Pagesense | About",
      description:
        "Learn about Pagesense's platform for website conversion optimization. Use without an account or sign up to save your audit history.",
      url: "/about",
    },
    alternates: {
      canonical: "/about",
    },
    other: {
      "script:ld+json": generateJSONLD({
        type: "WebPage",
        data: {
          name: "About Pagesense",
          description:
            "Learn about Pagesense and our mission to improve website conversion rates",
          url: "https://pagesense.co/about",
          mainEntity: {
            "@type": "Article",
            headline: "About Pagesense",
            description:
              "Pagesense is an AI-powered website audit platform helping businesses optimize their conversion rates. Use it with or without an account.",
            publisher: {
              "@type": "Organization",
              name: "Pagesense",
              url: "https://pagesense.co",
            },
          },
        },
      }),
      schema: [jsonLd, breadcrumbSchema],
    },
  };
};

export default function About() {
  return (
    <div className="dark w-screen min-h-screen grid place-items-center">
      <AboutComp />
    </div>
  );
}
