import { AuditForm } from "@/components/audit-form/AuditForm";
import { Timeline } from "@/components/Timeline";
import { AuditTitle } from "@/components/audit-form/AuditTitle";
import { FAQ } from "@/components/FAQ";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { BlurFade } from "@/components/magicui/blur-fade";
import { delay } from "@/lib/delay";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Pagesense | Audit Tool",
    description:
      "Run a comprehensive website audit powered by AI. Get detailed reports on SEO, accessibility, performance, and user experience instantly. Start optimizing your site now.",
    path: "/tool",
    keywords: [
      "website audit tool",
      "site analyzer",
      "SEO checker",
      "performance testing",
      "accessibility audit",
      "AI analysis tool",
      "website health check",
      "free website audit",
      "site optimization tool",
      "conversion rate audit",
      "user experience analysis",
      "website speed test",
    ],
  });

  const toolSchema = generateJSONLD({
    type: "SoftwareApplication",
    data: {
      name: "Pagesense Website Audit Tool",
      description:
        "AI-powered website audit tool for comprehensive site analysis",
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "SEO Analysis",
        "Performance Testing",
        "Accessibility Audit",
        "User Experience Analysis",
        "Conversion Rate Optimization",
      ],
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["tool"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/tool",
    },
    openGraph: {
      title: "Pagesense | Audit Tool",
      description:
        "Get instant AI-powered insights about your website's performance, SEO, and accessibility",
      url: "https://pagesense.co/tool",
      images: [
        {
          url: "https://pagesense.co/pagesensedemo.mp4",
          width: 1200,
          height: 630,
          alt: "Pagesense Website Audit Tool Demo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pagesense | Audit Tool",
      description: "Get instant AI-powered insights for your website",
      images: ["https://pagesense.co/pagesensestill.png"],
    },
    other: {
      "script:ld+json": [toolSchema, breadcrumbSchema],
    },
  };
};

export default function Tool() {
  return (
    <div className="w-screen min-h-screen grid place-items-center mt-20">
      <BlurFade delay={delay}>
        <div className="flex flex-col items-center">
          <AuditTitle />
          <AuditForm />
        </div>
      </BlurFade>
      <BlurFade delay={delay * 5}>
        <Timeline />
      </BlurFade>
      <BlurFade delay={delay * 10}>
        <FAQ />
      </BlurFade>
    </div>
  );
}
