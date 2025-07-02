import Construction from "@/components/Construction";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";
export async function generateMetadata() {
  const jsonLd = generateJSONLD({
    type: "CollectionPage",
    name: "CRO Templates | PageSense",
    description:
      "Browse our collection of conversion rate optimization templates for instant website analysis and improvement.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["templates"]);

  return {
    title: "CRO Templates | PageSense - AI-Powered Analysis",
    description:
      "Browse our collection of conversion rate optimization templates for instant website analysis and improvement.",
    openGraph: {
      title: "CRO Templates | PageSense - AI-Powered Analysis",
      description:
        "Browse our collection of conversion rate optimization templates for instant website analysis and improvement.",
      url: "/templates",
    },
    alternates: {
      canonical: "/templates",
    },
    other: {
      schema: [jsonLd, breadcrumbSchema],
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
