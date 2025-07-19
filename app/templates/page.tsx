import Construction from "@/components/Construction";
import {
  generateJSONLD,
  generateBreadcrumbSchema,
  getMetadata,
} from "@/lib/seo";

export async function generateMetadata() {
  const metadata = getMetadata({
    title: "Pagesense | Templates",
    description:
      "Browse our collection of conversion rate optimization templates for instant website analysis and improvement.",
    path: "/templates",
    keywords: [
      "CRO templates",
      "website optimization templates",
      "conversion rate templates",
      "audit templates",
      "website analysis templates",
      "SEO templates",
      "performance optimization templates",
      "Pagesense templates",
    ],
  });

  const jsonLd = generateJSONLD({
    type: "CollectionPage",
    data: {
      name: "Pagesense | Templates",
      description:
        "Browse our collection of conversion rate optimization templates for instant website analysis and improvement.",
      mainEntityOfPage: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "E-commerce Optimization Template",
            description:
              "Complete audit template for online stores and e-commerce websites",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Landing Page Template",
            description:
              "Conversion optimization template for landing pages and sales funnels",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Blog & Content Template",
            description:
              "SEO and readability template for content-heavy websites",
          },
        ],
      },
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["templates"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/templates",
    },
    openGraph: {
      title: "Pagesense | Templates",
      description:
        "Browse our collection of conversion rate optimization templates for instant website analysis and improvement.",
      url: "https://pagesense.co/templates",
      type: "website",
      images: [
        {
          url: "https://pagesense.co/Hero.png",
          width: 1200,
          height: 630,
          alt: "Pagesense CRO Templates",
        },
      ],
    },
    other: {
      "script:ld+json": [jsonLd, breadcrumbSchema],
    },
  };
}

export default function Templates() {
  return (
    <div className="dark w-screen min-h-screen grid place-items-center">
      <Construction />
    </div>
  );
}
