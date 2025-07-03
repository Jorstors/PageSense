import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  locale?: string;
  alternateLanguages?: { [key: string]: string };
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
export function generateJSONLD({
  type,
  data,
}: {
  type: string;
  data: Record<string, unknown>;
}) {
  const baseUrl = getBaseUrl();

  const base = {
    "@context": "https://schema.org",
    "@type": type,
    url: baseUrl,
    ...data,
  };

  return base;
}

// Export alias for backward compatibility
export const generateJsonLd = generateJSONLD;

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

/**
 * Generate breadcrumb schema for a given path
 * @param path Current page path segments
 * @returns JSON-LD breadcrumb schema
 */
export function generateBreadcrumbSchema(path: string[]) {
  const items = path.map((segment, index) => {
    const position = index + 1;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    const item = {
      "@type": "ListItem",
      position: position,
      name: name,
      item: `${getBaseUrl()}/${path.slice(0, position + 1).join("/")}`,
    };
    return item;
  });

  // Always include homepage as first item
  items.unshift({
    "@type": "ListItem",
    position: 1,
    name: "Home",
    item: getBaseUrl(),
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
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
