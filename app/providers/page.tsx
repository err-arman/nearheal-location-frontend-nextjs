// app/providers/page.tsx (Server Component - handles metadata)
import ProvidersClient from "@/components/providers/ProvidersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Providers Directory | Nearheal",
  description:
    "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
  keywords: [
    "healthcare providers",
    "NDIS services",
    "medical professionals",
    "healthcare directory",
    "Australia healthcare",
    "find doctors",
    "healthcare services",
  ],

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: `${
      process.env.NEXT_PUBLIC_APP_URL || "https://nearheal.com"
    }/providers`,
    title: "Healthcare Providers Directory | Nearheal",
    description:
      "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
    siteName: "Nearheal",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL || "https://nearheal.com"
        }/near_heal_logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "Nearheal Providers Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Providers Directory | Nearheal",
    description:
      "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
    images: [
      `${
        process.env.NEXT_PUBLIC_APP_URL || "https://nearheal.com"
      }/near_heal_logo.jpeg`,
    ],
  },
  // Add alternates for better SEO
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_APP_URL || "https://nearheal.com"
    }/providers`,
  },
};

export default function ProvidersPage() {
  return <ProvidersClient />;
}
