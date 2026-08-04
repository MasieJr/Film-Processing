import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- PWA METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL("https://film-process.masieseremu.co.za"),
  title: {
    default:
      "Foto First Cresta | Professional Film Processing, Developing, Scanning & Printing",
    template: "%s | Foto First Cresta",
  },
  description:
    "Johannesburg's premier analog photo lab. Fast 35mm, 120 medium format film processing, C-41 color developing, high-res digital scans.",
  keywords: [
    "film processing Johannesburg",
    "35mm film developing Cresta",
    "analog photo lab South Africa",
    "C41 film developing",
    "black and white film processing",
    "scan 35mm negatives",
    "120 medium format scanning",
    "Foto First Cresta",
    "Film Dev",
  ],
  authors: [{ name: "Foto First Cresta" }],
  creator: "Foto First Cresta",
  publisher: "Foto First Cresta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://film-process.masieseremu.co.za",
    title:
      "Foto First Cresta | Professional Film Processing & High-Res Scanning",
    description:
      "Order 35mm & 120 film developing online. High-res digital scans delivered straight to your email.",
    siteName: "Foto First Cresta",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foto First Cresta Film Processing Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foto First Cresta | Film Processing & Scanning",
    description:
      "Order 35mm & 120 film developing online. High-res digital scans.",
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

  applicationName: "Film Development",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Film Development",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
