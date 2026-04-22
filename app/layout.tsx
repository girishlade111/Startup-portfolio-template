import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import JsonLd from "./components/JsonLd";
import { Providers } from "./providers";
import { MusicPlayerProvider } from "@/components/music/MusicPlayerProvider";
import { MusicPlayerUI } from "@/components/music/MusicPlayerUI";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageCurtain } from "@/components/ui/PageCurtain";
import { ThemeTransition } from "@/components/ui/ThemeTransition";
import { Navbar } from "@/components/shared/Navbar";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://girish.ladestack.in"),
  title: {
    default: "Girish Lade — LadeStack Founder & Developer",
    template: "%s | Girish Lade",
  },
  description:
    "Solo founder building free AI-powered developer tools. LadeStack — free tools for developers, no login required. Based in Mumbai, India.",
  keywords: [
    "Girish Lade",
    "LadeStack",
    "Free Developer Tools",
    "AI Tools",
    "SaaS",
    "Mumbai Developer",
    "Solo Founder",
    "No Login Tools",
    "Free Code Editor",
    "Free Resume Builder",
  ],
  authors: [{ name: "Girish Lade", url: "https://ladestack.in" }],
  creator: "Girish Lade",
  openGraph: {
    type: "website",
    url: "https://girish.ladestack.in",
    title: "Girish Lade — LadeStack Founder",
    description:
      "Building free AI-powered tools for developers. No investors. No paywalls. Just code.",
    siteName: "Girish Lade Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Girish Lade - LadeStack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Girish Lade — LadeStack Founder",
    description: "Building free AI-powered tools for developers.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://girish.ladestack.in" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300`}
      >
        <JsonLd />
        <Providers>
          <MusicPlayerProvider>
            <PageCurtain />
            <ScrollProgress />
            <ThemeTransition />
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
            <MusicPlayerUI />
            <Toaster richColors position="bottom-right" />
          </MusicPlayerProvider>
        </Providers>
      </body>
    </html>
  );
}
