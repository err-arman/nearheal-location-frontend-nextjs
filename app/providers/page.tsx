// app/providers/page.tsx
import ProvidersClient from "@/components/providers/ProvidersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Providers Directory", // Will become "Healthcare Providers Directory | Nearheal"
  description:
    "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
  keywords: [
    "healthcare providers",
    "NDIS services", 
    "medical professionals",
    "healthcare directory",
    "Australia healthcare",
    "find doctors",
    "healthcare services"
  ],
  openGraph: {
    title: "Healthcare Providers Directory | Nearheal", // Full title for OG
    description:
      "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
    url: "/providers", // Relative URL since metadataBase is set in layout
    images: [
      {
        url: "/near_heal_logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Nearheal Providers Directory",
      },
    ],
  },
  twitter: {
    title: "Healthcare Providers Directory | Nearheal",
    description:
      "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
    images: ["/near_heal_logo.jpeg"],
  },
  alternates: {
    canonical: "/providers",
  },
};

export default function ProvidersPage() {
  return <ProvidersClient />;
}