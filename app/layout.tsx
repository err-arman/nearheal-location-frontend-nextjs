import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HeaderWithMegaMenu } from "@/components/HeaderWithMegaMenu";
import { FooterSection } from "@/components/FooterSection";
import { Libraries, LoadScript } from "@react-google-maps/api";
import GoogleMapsProvider from "./LayoutWrapper";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   icons: {
//     icon: "near_heal_logo.jpeg",
//   },
//   title: "Nearheal - Healthcare Platform",
//   description:
//     "Your complete healthcare and learning platform, connecting professionals worldwide.",
// };

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nearheal.com'),
  title: {
    default: "Nearheal - Healthcare Platform",
    template: "%s | Nearheal"
  },
  description: "Your complete healthcare and learning platform, connecting professionals worldwide.",
  keywords: ["healthcare", "NDIS", "medical services", "health providers", "Australia"],
  authors: [{ name: "Nearheal" }],
  icons: {
    icon: "/near_heal_logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    title: "Nearheal - Healthcare Platform",
    description: "Your complete healthcare and learning platform, connecting professionals worldwide.",
    siteName: "Nearheal",
    images: [{
      url: "/near_heal_logo.jpeg",
      width: 1200,
      height: 630,
      alt: "Nearheal - Healthcare Platform"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nearheal - Healthcare Platform",
    description: "Your complete healthcare and learning platform, connecting professionals worldwide.",
    images: ["/near_heal_logo.jpeg"],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const libraries: Libraries = ["places"];
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GoogleMapsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            // disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen w-full">
              <HeaderWithMegaMenu />
              <main className="flex-grow w-full ">{children}</main>
              <FooterSection />
            </div>
          </ThemeProvider>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
