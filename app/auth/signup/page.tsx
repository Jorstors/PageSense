import { Signup } from "@/components/signup";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Pagesense | Create Account",
    description:
      "Create a free Pagesense account to save your website audits, track improvements, and access premium features for better conversion optimization.",
    path: "/auth/signup",
    keywords: [
      "sign up",
      "create account",
      "register",
      "Pagesense account",
      "free registration",
      "website audit account",
      "conversion optimization",
    ],
  });

  const webPageSchema = generateJSONLD({
    type: "WebPage",
    data: {
      name: "Pagesense | Create Account",
      description: "Create a free Pagesense account to save your website audits, track improvements, and access premium features for better conversion optimization.",
      url: "https://pagesense.co/auth/signup",
      isPartOf: {
        "@type": "WebSite",
        name: "Pagesense",
        url: "https://pagesense.co",
      },
      mainEntity: {
        "@type": "WebApplication",
        name: "Pagesense Registration",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free account registration for website optimization tools",
        },
      },
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["auth", "signup"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/auth/signup",
    },
    openGraph: {
      type: "website",
      title: "Pagesense | Create Account",
      description: "Create your free Pagesense account for website optimization",
      url: "https://pagesense.co/auth/signup",
      images: [
        {
          url: "https://pagesense.co/WOB-Big.png",
          width: 512,
          height: 512,
          alt: "Pagesense Logo",
        },
      ],
      siteName: "Pagesense",
    },
    twitter: {
      card: "summary",
      title: "Pagesense | Create Account",
      description: "Create your free Pagesense account",
      images: ["https://pagesense.co/WOB-Big.png"],
    },
    other: {
      "script:ld+json": [webPageSchema, breadcrumbSchema],
    },
  };
};

export default function SignupPage() {
  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <Signup
        heading="Create your account"
        logo={{
          url: "/",
          src: "/WOB-Big.png",
          alt: "Pagesense logo",
          title: "Pagesense",
        }}
        loginUrl="/auth/login"
      />
    </div>
  );
}
