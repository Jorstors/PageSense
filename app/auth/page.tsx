import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Authentication - PageSense Account Access",
    description:
      "Access your PageSense account or create a new one to save your website audits and track your optimization progress.",
    path: "/auth",
    keywords: [
      "authentication",
      "account access",
      "login",
      "signup",
      "PageSense account",
    ],
  });

  const webPageSchema = generateJSONLD({
    type: "WebPage",
    data: {
      name: "Authentication - PageSense",
      description:
        "Access your PageSense account or create a new one to save your website audits and track your optimization progress.",
      url: "https://pagesense.co/auth",
      isPartOf: {
        "@type": "WebSite",
        name: "PageSense",
        url: "https://pagesense.co",
      },
      mainEntity: {
        "@type": "WebApplication",
        name: "PageSense Authentication",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free access to website optimization tools",
        },
      },
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["auth"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/auth",
    },
    openGraph: {
      type: "website",
      title: "Authentication - PageSense",
      description: "Access or create your PageSense account",
      url: "https://pagesense.co/auth",
      images: [
        {
          url: "https://pagesense.co/WOB-Big.png",
          width: 512,
          height: 512,
          alt: "PageSense Logo",
        },
      ],
      siteName: "PageSense",
    },
    twitter: {
      card: "summary",
      title: "Authentication - PageSense",
      description: "Access or create your PageSense account",
      images: ["https://pagesense.co/WOB-Big.png"],
    },
    other: {
      "script:ld+json": [webPageSchema, breadcrumbSchema],
    },
  };
};

export default function AuthPage() {
  return (
    <div className="w-screen min-h-screen grid place-items-center mt-20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Pagesense
          </h1>
          <p className="text-muted-foreground">Choose an option to continue</p>
        </div>

        <div className="grid gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Access your existing Pagesense account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="default">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                New to Pagesense? Create a free account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link href="/auth/signup">Create Account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild variant="ghost">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
