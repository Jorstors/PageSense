import { getMetadata, generateJSONLD } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Page Not Found - 404 Error",
    description:
      "Sorry, we couldn't find the page you're looking for. Please check the URL or navigate back to our homepage.",
    path: "/404",
    keywords: [
      "404",
      "page not found",
      "error page",
      "missing page",
      "PageSense help",
    ],
  });

  const errorSchema = generateJSONLD({
    type: "WebPage",
    data: {
      "@type": "WebPage",
      name: "404 - Page Not Found",
      description: "Sorry, we couldn't find the page you're looking for",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://pagesense.co",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Error 404",
          },
        ],
      },
    },
  });

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      title: "Page Not Found - PageSense",
      description: "Sorry, we couldn't find the page you're looking for",
      type: "website",
      url: "https://pagesense.co/404",
    },
    other: {
      "script:ld+json": errorSchema,
    },
  };
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="space-y-6 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="text-muted-foreground text-xl">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page might have been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
          <Button asChild variant="default" size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tool">Try Our Audit Tool</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
