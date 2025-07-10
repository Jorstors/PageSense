import Construction from "@/components/Construction";
import {
  generateJSONLD,
  generateBreadcrumbSchema,
  getMetadata,
} from "@/lib/seo";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export async function generateMetadata() {
  const metadata = getMetadata({
    title: "Dashboard | PageSense - Manage Your SEO Audits",
    description:
      "View and manage your website audits, reports, and SEO optimization suggestions in one place.",
    path: "/dashboard",
    keywords: [
      "SEO dashboard",
      "audit dashboard",
      "website analytics",
      "performance tracking",
      "SEO reports",
      "website optimization",
      "PageSense dashboard",
      "user account",
    ],
  });

  const jsonLd = generateJSONLD({
    type: "WebPage",
    data: {
      name: "User Dashboard | PageSense",
      description:
        "View and manage your website audits, reports, and SEO optimization suggestions in one place.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Recent Audits",
            description: "View your most recent website audits and results",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Saved Reports",
            description: "Access your saved SEO analysis reports",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Account Settings",
            description: "Manage your account preferences and subscription",
          },
        ],
      },
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["dashboard"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/dashboard",
    },
    openGraph: {
      title: "Dashboard | PageSense - Manage Your SEO Audits",
      description:
        "View and manage your website audits, reports, and SEO optimization suggestions in one place.",
      url: "https://pagesense.co/dashboard",
      type: "website",
      images: [
        {
          url: "https://pagesense.co/Hero.png",
          width: 1200,
          height: 630,
          alt: "PageSense Dashboard",
        },
      ],
    },
    other: {
      "script:ld+json": [jsonLd, breadcrumbSchema],
    },
  };
}

export default function Dashboard() {
  return (
  <div className="dark w-screen min-h-screen grid place-items-center">
    <ProtectedRoute >
        <Construction />
    </ProtectedRoute>
  </div>
  );
}
