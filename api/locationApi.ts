import axiosInstance from "./axiosInstance";
import { Location, LocationFilters, LocationsResponse } from "@/types/location";

/**
 * Fetch locations with optional filters
 * @param filters - Optional filters for the locations
 * @returns Promise with location data and pagination info
 */
export const getLocations = async (
  filters: LocationFilters = {}
): Promise<LocationsResponse> => {
  try {
    // Build query parameters
    const params = new URLSearchParams();

    // Add pagination params
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    // Add search params
    if (filters.search) params.append("search", filters.search);
    if (filters.city) params.append("city", filters.city);

    // Add category filters (join multiple categories with comma)
    if (filters.categories && filters.categories.length > 0) {
      params.append("categories", filters.categories.join(","));
    }

    // Add price range filters
    if (filters.priceFrom)
      params.append("priceFrom", filters.priceFrom.toString());
    if (filters.priceTo) params.append("priceTo", filters.priceTo.toString());

    // Make the API call
    const response = await axiosInstance.get<LocationsResponse>(
      `/location?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    // Return empty data on error
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  }
};

/**
 * Get a single location by ID
 * @param id - Location ID
 * @returns Promise with location data
 */
export const getLocationById = async (id: string): Promise<Location | null> => {
  try {
    const response = await axiosInstance.get<Location>(`/location/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    return null;
  }
};

/**
 * Get the placeholder image URL for locations without gallery
 * @returns URL of the placeholder image
 */
export const getLocationPlaceholderImage = (): string => {
  return "/images/location-placeholder.jpg";
};

export const postFavorite = async (locationId: string, userId: string) => {
  try {
    const response = await axiosInstance.post("favourites", {
      locationId,
      userId,
    });
    return !!response.data;
  } catch (error) {
    console.error(`Error to favorite location with ID ${locationId}:`, error);
    return false;
  }
};
export const removeFavorite = async (favoriteId: string) => {
  try {
    const response = await axiosInstance.delete(`favourites/${favoriteId}`);
    return !!response.data;
  } catch (error) {
    console.error(`Error to favorite location with ID ${favoriteId}:`, error);
    return false;
  }
};

/**
 * Fetch locations with optional filters
 * @param filters - Optional filters for the locations
 * @returns Promise with location data and pagination info
 */
export const getFavoriteLocations = async (
  filters: LocationFilters = {}
): Promise<LocationsResponse> => {
  try {
    if (!filters?.userId) {
      throw new Error("User Id missing");
    }
    // Build query parameters
    const params = new URLSearchParams();

    // Add pagination params
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    // Add search params
    if (filters.search) params.append("search", filters.search);
    if (filters.city) params.append("city", filters.city);

    // Add category filters (join multiple categories with comma)
    if (filters.categories && filters.categories.length > 0) {
      params.append("categories", filters.categories.join(","));
    }

    // Add price range filters
    if (filters.priceFrom)
      params.append("priceFrom", filters.priceFrom.toString());
    if (filters.priceTo) params.append("priceTo", filters.priceTo.toString());

    // Make the API call
    const response = await axiosInstance.get(
      `/favourites/user/${filters?.userId}?${params.toString()}`
    );
    if (response.data.data) {
      response.data.data =
        response.data.data?.map((_: any) => ({
          ..._?.location,
          favoriteId: _?.id,
        })) ?? [];
    }
    return response.data;
  } catch (error) {
    // console.error('Error fetching locations:', error);
    // Return empty data on error
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  }
};
