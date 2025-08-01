import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollRestoration } from "@/components/ScrollRestoration";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://pagesense.co"),
  title: {
    default: "Pagesense | Instant Website Audits",
    template: "%s",
  },
  description:
    "Transform your website's performance with Pagesense's AI-powered audit tool. Get instant insights and actionable recommendations for SEO, accessibility, and user experience.",
  applicationName: "Pagesense",
  authors: [{ name: "Pagesense Team" }],
  generator: "Next.js",
  keywords: [
    "AI audit tool",
    "website audit",
    "application audit",
    "SEO analysis",
    "accessibility checker",
    "performance audit",
    "web optimization",
    "Pagesense",
    "automated audit",
    "usability audit",
    "web compliance",
    "site health check",
    "conversion rate optimization",
    "CRO tool",
    "website analytics",
  ],
  openGraph: {
    type: "website",
    siteName: "Pagesense",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pagesense",
    creator: "@pagesense",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "black" }],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <div className="dark w-full h-screen bg-background text-primary flex flex-col">
          <div className="sticky z-50 top-0 w-full h-fit">
            <Navbar />
          </div>
          <div className="flex-1 w-full overflow-hidden relative">
            <ScrollRestoration />
            <ScrollArea type="always" className="w-full h-full scrollToTop">
              <AnimatedGridPattern
                maxOpacity={0.3}
                className={cn(
                  "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                  "md:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                  "lg:[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-30%] h-[200%]",
                  "transform-[perspective(800px)_rotateX(20deg)_scaleY(1.08)]",
                  "opacity-20"
                )}
              />
              {children}
              <Footer />
            </ScrollArea>
          </div>
        </div>
        <Toaster />
      </AuthProvider>
    </body>
    </html>
  );
}
