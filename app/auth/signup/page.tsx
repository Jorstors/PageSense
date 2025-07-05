import { Signup } from "@/components/signup";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Sign Up - Create Your PageSense Account",
    description:
      "Create a free PageSense account to save your website audits, track improvements, and access premium features for better conversion optimization.",
    path: "/auth/signup",
    keywords: [
      "sign up",
      "create account",
      "register",
      "PageSense account",
      "free registration",
      "website audit account",
      "conversion optimization",
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["auth", "signup"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/auth/signup",
    },
    openGraph: {
      title: "Sign Up - PageSense",
      description: "Create your free PageSense account for website optimization",
      url: "https://pagesense.co/auth/signup",
    },
    twitter: {
      card: "summary",
      title: "Sign Up - PageSense",
      description: "Create your free PageSense account",
    },
    other: {
      "script:ld+json": [breadcrumbSchema],
    },
  };
};

export default function SignupPage() {
  return (
    <Signup
      heading="Create your account"
      logo={{
        url: "/",
        src: "/WOB-Big.png",
        alt: "PageSense logo",
        title: "PageSense",
      }}
      loginUrl="/auth/login"
    />
  );
}
