import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner";
import "./globals.css";


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
    "AI website analysis"
  ],
  authors: [{ name: "Pagesense Team", url: "https://pagesense.co" }],
  creator: "Pagesense",
  publisher: "Pagesense",
  openGraph: {
    title: "Pagesense – AI Powered Audit Tool",
    description: "Audit your website or application for SEO, accessibility, and performance with Pagesense's AI-powered platform.",
    url: "https://pagesense.co",
    siteName: "Pagesense",
    images: [
      {
        url: "/WOB-Big.png",
        width: 1200,
        height: 630,
        alt: "Pagesense AI Audit Tool"
      }
    ],
    locale: "en_US",
    type: "website"
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
      <div className="dark w-full min-h-screen bg-background text-primary">
        <div className="fixed z-10 top-0 w-full h-fit">
          <Navbar />
        </div>
            {children}
        <Toaster />
      </div>
      </body>
    </html>
  );
}
