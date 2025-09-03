// app/providers/page.tsx
import ProvidersClient from "@/components/providers/ProvidersClient";
import { Metadata } from "next";

// // This is the BEST approach - guarantees metadata execution
// export async function generateMetadata(): Promise<Metadata> {
//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nearheal.com';

//   return {
//     title: "Healthcare Providers Directory",
//     description: "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
//     keywords: [
//       "healthcare providers",
//       "NDIS services",
//       "medical professionals",
//       "healthcare directory",
//       "Australia healthcare",
//       "find doctors",
//       "healthcare services"
//     ],
//     openGraph: {
//       title: "Healthcare Providers Directory | Nearheal",
//       description: "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
//       url: `${baseUrl}/providers`,
//       images: [{
//         url: `${baseUrl}/near_heal_logo.jpeg`,
//         width: 1200,
//         height: 630,
//         alt: "Nearheal Providers Directory",
//       }],
//       type: "website",
//       siteName: "Nearheal",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Healthcare Providers Directory | Nearheal",
//       description: "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
//       images: [`${baseUrl}/near_heal_logo.jpeg`],
//     },
//     alternates: {
//       canonical: `${baseUrl}/providers`,
//     },
//     robots: {
//       index: true,
//       follow: true,
//     }
//   };
// }

export const metadata: Metadata = {
  title: "Healthcare Providers Directory",
  description:
    "Find and connect with trusted healthcare providers and NDIS services near you. Browse our comprehensive directory of medical professionals.",
  keywords: [
    "About Nearheal",
    "healthcare platform",
    "NDIS services",
    "healthcare Australia",
    "medical services",
    "Nearheal vision",
    "Nearheal mission",
  ],
  // Use absolute URLs for better social media sharing
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: `${
      process.env.NEXT_PUBLIC_APP_URL || "https://nearheal.com"
    }/providers`,
    title: "Providers | Nearheal",
    description:
      "Discover providers",
    siteName: "Nearheal",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL || "https://nearheal.com"
        }/near_heal_logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "Providers Nearheal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Providers | Nearheal",
    description:
      "Nearheal is building an innovative, resilient, and compassionate healthcare ecosystem in Australia. Learn more about us.",
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
