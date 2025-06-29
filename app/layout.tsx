import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pagesense",
  description: "An AI powered audit tool for websites and applications",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  icons: {
    icon: "/WOB-Big.ico",
    apple: "/WOB-Big.ico",
  },
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
    "digital audit",
    "web app audit",
    "AI website analysis",
  ],
  authors: [{ name: "Pagesense Team", url: "https://pagesense.co" }],
  creator: "Pagesense",
  publisher: "Pagesense",
  openGraph: {
    title: "Pagesense – AI Powered Audit Tool",
    description:
      "Audit your website or application for SEO, accessibility, and performance with Pagesense's AI-powered platform.",
    url: "https://pagesense.co",
    siteName: "Pagesense",
    images: [
      {
        url: "/WOB-Big.png",
        width: 1200,
        height: 630,
        alt: "Pagesense AI Audit Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  category: "Technology",
};

export const viewport = {
  themeColor: "#ffe0c2",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="dark w-full h-screen bg-background text-primary flex flex-col">
          <div className="fixed z-10 top-0 w-full h-fit">
            <Navbar />
          </div>
          <div className="flex-1 w-full overflow-hidden">
            <ScrollArea type="always" className="w-full h-full">
              <AnimatedGridPattern
                maxOpacity={0.3}
                className={cn(
                  "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                  "md:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                  "lg:[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                  "opacity-20"
                )}
              />
              {children}
              <Toaster />
              <Footer />
            </ScrollArea>
          </div>
        </div>
      </body>
    </html>
  );
}
