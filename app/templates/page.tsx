import Construction from "@/components/Construction";
import { getMetadata, generateJSONLD } from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Audit Templates",
    description:
      "Explore pre-built templates for website audits, accessibility checks, and performance analysis. Start with expert-crafted templates to analyze your site.",
    path: "/templates",
    keywords: [
      "audit templates",
      "website analysis templates",
      "SEO templates",
      "accessibility templates",
      "performance audit templates",
    ],
  });

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/templates",
    },
    other: {
      "script:ld+json": generateJSONLD({
        type: "WebPage",
        data: {
          name: "Audit Templates | Pagesense",
          description: "Pre-built templates for comprehensive website audits",
          url: "https://pagesense.co/templates",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "SEO Audit Template",
                description: "Comprehensive SEO analysis template",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Accessibility Audit Template",
                description: "WCAG compliance audit template",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Performance Audit Template",
                description: "Website performance analysis template",
              },
            ],
          },
        },
      }),
    },
  };
};

export default function Templates() {
  return (
    <div className="dark w-screen min-h-screen grid place-items-center">
      <Construction />
    </div>
  );
}
