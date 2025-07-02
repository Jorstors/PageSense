import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  locale?: string;
  alternateLanguages?: { [key: string]: string };
}

interface JSONLDProps {
  type: "Organization" | "WebSite" | "WebPage" | "BreadcrumbList";
  data: Record<string, unknown>;
}

// Base keywords that should be included on all pages
const baseKeywords = [
  "AI audit tool",
  "website audit",
  "application audit",
  "SEO analysis",
  "accessibility checker",
  "performance audit",
  "web optimization",
  "Pagesense",
  "automated audit",
  "usability audit",
];

// Get base URL based on environment
function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "https://pagesense.co")
  );
}

// Generate JSON-LD structured data
export function generateJSONLD({ type, data }: JSONLDProps): string {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return JSON.stringify(baseStructure);
}

// Generate breadcrumb JSON-LD
export function generateBreadcrumbJSONLD(
  items: { name: string; url: string }[]
): string {
  return generateJSONLD({
    type: "BreadcrumbList",
    data: {
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  });
}

export function getMetadata({
  title,
  description,
  path,
  keywords = [],
  locale = "en",
  alternateLanguages = {},
}: SEOProps): Metadata {
  const baseUrl = getBaseUrl();
  const fullUrl = `${baseUrl}${path}`;

  // Combine base keywords with page-specific ones
  const allKeywords = [...new Set([...baseKeywords, ...keywords])];

  const metadata: Metadata = {
    title: {
      default: `${title} | Pagesense`,
      template: "%s | Pagesense",
    },
    description,
    keywords: allKeywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Pagesense",
      locale,
      type: "website",
      images: [
        {
          url: "/WOB-Big.png",
          width: 1200,
          height: 630,
          alt: "Pagesense AI Audit Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/WOB-Big.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };

  return metadata;
}
