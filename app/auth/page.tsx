import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  const breadcrumbSchema = generateBreadcrumbSchema(["auth"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/auth",
    },
    openGraph: {
      title: "Authentication - PageSense",
      description: "Access or create your PageSense account",
      url: "https://pagesense.co/auth",
    },
    twitter: {
      card: "summary",
      title: "Authentication - PageSense",
      description: "Access or create your PageSense account",
    },
    other: {
      "script:ld+json": [breadcrumbSchema],
    },
  };
};

export default function AuthPage() {
  return (
    <div className="container mx-auto flex items-center justify-center h-[calc(100vh_-_4rem)]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Pagesense</h1>
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
