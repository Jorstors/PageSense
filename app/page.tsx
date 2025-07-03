import { Feature } from "@/components/Feature";
import { Hero } from "@/components/hero";
import { BlurFade } from "@/components/magicui/blur-fade";
import { delay } from "@/lib/delay";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "AI-Powered Website Audit Tool - Improve Your Site in Minutes",
    description:
      "Transform your website's performance with PageSense's AI-powered audit tool. Get instant insights and actionable recommendations for SEO, accessibility, and conversion rate optimization.",
    path: "/",
    keywords: [
      "website analysis",
      "automated testing",
      "SEO optimization",
      "website performance",
      "accessibility testing",
      "AI website audit",
      "conversion rate optimization",
      "website improvement",
      "user experience analysis",
      "web analytics",
      "PageSense",
      "site audit tool",
    ],
  });

  const websiteSchema = generateJSONLD({
    type: "WebSite",
    data: {
      name: "PageSense",
      description: "AI-Powered Website Optimization Platform",
      url: "https://pagesense.co",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://pagesense.co/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  });

  const organizationSchema = generateJSONLD({
    type: "Organization",
    data: {
      name: "PageSense",
      url: "https://pagesense.co",
      logo: "https://pagesense.co/WOB-Big.png",
      sameAs: ["https://twitter.com/pagesense", "https://github.com/pagesense"],
    },
  });

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/",
    },
    openGraph: {
      type: "website",
      title: "PageSense - AI-Powered Website Optimization Tool",
      description:
        "Transform your website's performance with instant AI-powered insights and recommendations.",
      url: "https://pagesense.co",
      images: [
        {
          url: "https://pagesense.co/Hero.png",
          width: 1200,
          height: 630,
          alt: "PageSense - AI-Powered Website Optimization",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "PageSense - AI-Powered Website Optimization",
      description:
        "Transform your website's performance with instant AI-powered insights",
      images: ["https://pagesense.co/Hero.png"],
    },
    other: {
      "script:ld+json": [
        websiteSchema,
        organizationSchema,
        generateBreadcrumbSchema([]), // Empty array for homepage, representing root of site
      ],
    },
  };
};

export default function Main() {
  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <Hero />
      <BlurFade delay={delay * 15}>
        <Feature />
      </BlurFade>
    </div>
  );
}
