export interface BusinessHour {
  day: string;
  openTime: string;
  closeTime: string;
}

export interface SlideContent {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface contentHero {
  id: string;
  providerId: string;
  slideContents: SlideContent[];
  createdAt: string;
  updatedAt: string;
}

interface Highligh {
  id: string;
  text: string;
}

export interface ContentStory {
  id: string;
  providerId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  // highlights: Highligh[];
}

export interface Location {
  id: string;
  title: string;
  description: string;
  tagline: string[];
  googleAddress: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  email: string;
  website: string;
  logo?: string;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  googlePlus: string | null;
  youtube: string | null;
  instagram: string | null;
  youtubeVideoUrl: string | null;
  priceStatus: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  claimStatus: string;
  faqs: any | null;
  contentHero: contentHero | null;
  services: Service[] | null;
  contentStories: ContentStory[] | null;
  businessHours: BusinessHour[];
  features: string[];
  categories: string[];
  location: string;
  gallery: string[] | null;
  pricingPlanId: string | null;
  importId: string;
  createdAt: string;
  updatedAt: string;
  favoriteId?: string;
}

export interface LocationsResponse {
  data: Location[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LocationFilters {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  categories?: string[];
  priceFrom?: number;
  priceTo?: number;
  userId?: string;
}
