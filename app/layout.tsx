import type { Metadata } from "next";
import { Inter, Sora, Nunito_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hikmet Gulsesli — Developer Portal",
  description: "Developer focused on shipping high-performance web applications and autonomous agents. Building with AI, open-source tools, and modern web technologies.",
  keywords: ["Hikmet Gulsesli", "Developer", "AI", "OpenClaw", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Hikmet Gulsesli" }],
  creator: "Hikmet Gulsesli",
  metadataBase: new URL("https://setrox.com.tr"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://setrox.com.tr",
    siteName: "Hikmet Gulsesli — Developer Portal",
    title: "Hikmet Gulsesli — Developer Portal",
    description: "Developer focused on shipping high-performance web applications and autonomous agents.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hikmet Gulsesli Developer Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hikmet Gulsesli — Developer Portal",
    description: "Developer focused on shipping high-performance web applications and autonomous agents.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${sora.variable} ${nunitoSans.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
