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

export const metadata: Metadata = {
  title: "Nearheal - Healthcare Platform",
  description:
    "Your complete healthcare and learning platform, connecting professionals worldwide.",
  generator: "v0.dev",
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
