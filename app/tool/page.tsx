import { AuditForm } from "@/components/audit-form/AuditForm";
import { Timeline } from "@/components/Timeline";
import { AuditTitle } from "@/components/audit-form/AuditTitle";
import { getMetadata, generateJSONLD } from "@/lib/seo";
import { BlurFade } from "@/components/magicui/blur-fade";
import { delay } from "@/lib/delay";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Website Audit Tool",
    description:
      "Run a comprehensive website audit powered by AI. Get detailed reports on SEO, accessibility, performance, and user experience instantly.",
    path: "/tool",
    keywords: [
      "website audit tool",
      "site analyzer",
      "SEO checker",
      "performance testing",
      "accessibility audit",
      "AI analysis tool",
      "website health check",
    ],
  });

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/tool",
    },
    other: {
      "script:ld+json": generateJSONLD({
        type: "WebPage",
        data: {
          "@type": "WebApplication",
          name: "Pagesense Audit Tool",
          url: "https://pagesense.co/tool",
          applicationCategory: "WebApplication",
          description: "AI-powered website audit and analysis tool",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/OnlineOnly",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "SEO Analysis",
            "Accessibility Testing",
            "Performance Optimization",
            "User Experience Audit",
            "AI-Powered Recommendations",
          ],
        },
      }),
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
    </div>
  );
}
