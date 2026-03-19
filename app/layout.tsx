import type { Metadata } from "next";
import { Inter, Sora, Fira_Code } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://setrox.com.tr"),
  title: "Hikmet Gulsesli — Developer Portal",
  description: "OpenClaw Builder ve otomasyon sistemleri uzmanı. 10 AI agent, 24 deployed web app, 5 automated workflow.",
  keywords: ["Hikmet Gulsesli", "OpenClaw", "Developer", "AI", "Automation", "Web Development"],
  authors: [{ name: "Hikmet Gulsesli" }],
  creator: "Hikmet Gulsesli",
  openGraph: {
    title: "Hikmet Gulsesli — Developer Portal",
    description: "OpenClaw Builder ve otomasyon sistemleri uzmanı. 10 AI agent, 24 deployed web app, 5 automated workflow.",
    type: "website",
    locale: "tr_TR",
    siteName: "Hikmet Gulsesli",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hikmet Gulsesli — Developer Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hikmet Gulsesli — Developer Portal",
    description: "OpenClaw Builder ve otomasyon sistemleri uzmanı.",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: "/",
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
      className={`${inter.variable} ${sora.variable} ${firaCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0f2323] text-slate-900 dark:text-slate-100 transition-colors">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
