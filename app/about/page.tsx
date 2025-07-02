import { About as AboutComp } from "@/components/about";
import { getMetadata, generateJSONLD } from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "About Pagesense",
    description:
      "Learn about Pagesense, the AI-powered website audit platform revolutionizing how developers and businesses optimize their web presence.",
    path: "/about",
    keywords: [
      "about pagesense",
      "website audit company",
      "AI technology",
      "web optimization platform",
      "digital analysis tool",
      "website improvement platform",
    ],
  });

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/about",
    },
    other: {
      "script:ld+json": generateJSONLD({
        type: "WebPage",
        data: {
          name: "About Pagesense",
          description:
            "Learn about Pagesense and our mission to improve the web",
          url: "https://pagesense.co/about",
          mainEntity: {
            "@type": "Article",
            headline: "About Pagesense",
            description:
              "Pagesense is an AI-powered website audit platform helping businesses optimize their online presence",
            publisher: {
              "@type": "Organization",
              name: "Pagesense",
              url: "https://pagesense.co",
            },
          },
        },
      }),
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
