import { Login } from "@/components/login";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { url } from "inspector";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Login - Access Your PageSense Account",
    description:
      "Sign in to your PageSense account to access your website audit history, saved reports, and premium features.",
    path: "/auth/login",
    keywords: [
      "login",
      "sign in",
      "account access",
      "PageSense login",
      "website audit account",
      "user dashboard",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["auth", "login"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/auth/login",
    },
    openGraph: {
      title: "Login - PageSense",
      description: "Sign in to access your PageSense account and audit history",
      url: "https://pagesense.co/auth/login",
    },
    twitter: {
      card: "summary",
      title: "Login - PageSense",
      description: "Sign in to access your PageSense account",
    },
    other: {
      "script:ld+json": [breadcrumbSchema],
    },
  };
};

export default function LoginPage() {
  return <Login  heading="Login to your account"
  logo={{
    url: "/",
    src: "/WOB-Big.png",
    alt: "logo",
    title: "Pagesense.co",
  }}
  signupUrl="/auth/signup"
  />;
}
