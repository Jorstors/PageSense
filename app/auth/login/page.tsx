import { Login } from "@/components/login";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const generateMetadata = () => {
  const metadata = getMetadata({
    title: "Pagesense | Login",
    description:
      "Sign in to your Pagesense account to access your website audit history, saved reports, and premium features.",
    path: "/auth/login",
    keywords: [
      "login",
      "sign in",
      "account access",
      "Pagesense login",
      "website audit account",
      "user dashboard",
    ],
  });

  const webPageSchema = generateJSONLD({
    type: "WebPage",
    data: {
      name: "Pagesense | Login",
      description: "Sign in to your Pagesense account to access your website audit history, saved reports, and premium features.",
      url: "https://pagesense.co/auth/login",
      isPartOf: {
        "@type": "WebSite",
        name: "Pagesense",
        url: "https://pagesense.co",
      },
      mainEntity: {
        "@type": "WebApplication",
        name: "Pagesense Login",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema(["auth", "login"]);

  return {
    ...metadata,
    alternates: {
      canonical: "https://pagesense.co/auth/login",
    },
    openGraph: {
      type: "website",
      title: "Pagesense | Login",
      description: "Sign in to access your Pagesense account and audit history",
      url: "https://pagesense.co/auth/login",
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
      title: "Pagesense | Login",
      description: "Sign in to access your Pagesense account",
      images: ["https://pagesense.co/WOB-Big.png"],
    },
    other: {
      "script:ld+json": [webPageSchema, breadcrumbSchema],
    },
  };
};

export default function LoginPage() {
  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <Login
        heading="Login to your account"
        logo={{
          url: "/",
          src: "/WOB-Big.png",
          alt: "logo",
          title: "Pagesense.co",
        }}
        signupUrl="/auth/signup"
      />
    </div>
  );
}
