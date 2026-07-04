// app/layout.js

import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CartProvider } from "@/lib/CartContext";
import { AuthProvider } from "@/lib/AuthContext";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://4x4center.sa"),
  title: {
    default: "4x4 Center | Premium Off-Road & Overlanding Gear",
    template: "%s | 4x4 Center",
  },
  description:
    "Shop premium off-road lighting, suspension, recovery gear and overlanding equipment from the world's top 4x4 brands. Shipping across Saudi Arabia.",
  keywords: [
    "4x4",
    "off-road",
    "overlanding",
    "suspension",
    "lighting",
    "recovery",
    "Saudi Arabia",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "4x4 Center",
  },
  twitter: {
    card: "summary_large_image",
    site: "@4x4center",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@500;600;700&family=Cairo:wght@400;500;600;700&display=swap"
        />
      </head>

      <body>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
