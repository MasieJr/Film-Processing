import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css"; // Assuming your CSS is imported here

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
  title: "Film Development",
  description: "Film management",
  applicationName: "Film Development",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Film Development",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000", // Your brand green for the mobile browser bar!
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Your Main App Content */}
        {children}

        {/* Vercel Analytics & Speed Insights */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
