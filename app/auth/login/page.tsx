import { Login } from "@/components/login";
import {
  getMetadata,
  generateJSONLD,
  generateBreadcrumbSchema,
} from "@/lib/seo";

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

  const webPageSchema = generateJSONLD({
    type: "WebPage",
    data: {
      name: "Login - PageSense",
      description: "Sign in to your PageSense account to access your website audit history, saved reports, and premium features.",
      url: "https://pagesense.co/auth/login",
      isPartOf: {
        "@type": "WebSite",
        name: "PageSense",
        url: "https://pagesense.co",
      },
      mainEntity: {
        "@type": "WebApplication",
        name: "PageSense Login",
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
      title: "Login - PageSense",
      description: "Sign in to access your PageSense account and audit history",
      url: "https://pagesense.co/auth/login",
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
      title: "Login - PageSense",
      description: "Sign in to access your PageSense account",
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
