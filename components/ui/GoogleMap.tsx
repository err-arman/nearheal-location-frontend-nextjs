import React, { useEffect, useRef, useState, useCallback } from "react";

interface MapPin {
  lat?: number;
  lng?: number;
  address?: string;
  title: string;
  description: string;
  link?: string;
  id?: string; // Add id to identify pins
}

interface GoogleMapProps {
  pins: MapPin[];
  zoom?: number;
  height?: string;
  width?: string;
  apiKey?: string;
  selectedLocationId?: string | null; // Add prop for selected location
  onClearSelection?: () => void; // Add callback for clearing selection
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  pins,
  zoom = 14,
  height = "400px",
  width = "100%",
  apiKey,
  selectedLocationId = null,
  onClearSelection,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [geocodedPins, setGeocodedPins] = useState<MapPin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom map style with lighter colors
  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ color: "#f9fafb" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#d1e3dd" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eaeaea" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#d1d1d1" }],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [{ color: "#909090" }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6c6c6c" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
  ];

  // Create a singleton pattern for Google Maps script loading
  const loadGoogleMapsScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // If Google Maps is already loaded, resolve immediately
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        resolve();
        return;
      }

      // If the script is already being loaded by another instance
      const existingScript = document.getElementById("google-maps-script");
      if (existingScript) {
        // Wait for the existing script to load
        const checkIfLoaded = () => {
          if (window.google && window.google.maps) {
            setMapLoaded(true);
            resolve();
          } else {
            setTimeout(checkIfLoaded, 100);
          }
        };
        checkIfLoaded();
        return;
      }

      // If no script exists, create and load it
      const googleMapsApiKey =
        apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!googleMapsApiKey) {
        const error = "Google Maps API key is missing in .env file";
        console.error(error);
        setError(error);
        setIsLoading(false);
        reject(new Error(error));
        return;
      }

      // Create a unique callback name to avoid conflicts
      const callbackName = `initGoogleMaps${Date.now()}`;

      // Create the script element
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places,marker&callback=${callbackName}`;
      script.async = true;
      script.defer = true;

      // Define the callback function
      window[callbackName] = () => {
        setMapLoaded(true);
        resolve();
        // Clean up the callback
        delete window[callbackName];
      };

      // Handle script load errors
      script.onerror = () => {
        const error = "Failed to load Google Maps script";
        console.error(error);
        setError(error);
        setIsLoading(false);
        reject(new Error(error));
        // Remove the script on error
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };

      document.head.appendChild(script);
    });
  }, [apiKey]);

  useEffect(() => {
    loadGoogleMapsScript().catch((err) => {
      console.error("Error loading Google Maps:", err);
    });

    return () => {
      // No need to clean up global callbacks as they're now unique and self-cleaning
    };
  }, [loadGoogleMapsScript]);

  // Geocode addresses to get coordinates
  useEffect(() => {
    if (!mapLoaded || pins.length === 0) return;

    setIsLoading(true);
    const geocodePins = async () => {
      try {
        const geocoder = new window.google.maps.Geocoder();
        const results = await Promise.all(
          pins.map(async (pin) => {
            // If pin already has coordinates, use them
            if (pin?.lat && pin?.lng) {
              return pin;
            }

            // If pin has an address, geocode it
            if (pin.address) {
              return new Promise<MapPin>((resolve, reject) => {
                geocoder.geocode(
                  { address: pin.address },
                  (results: any, status: any) => {
                    if (status === "OK" && results && results[0]) {
                      const location = results[0].geometry.location;
                      resolve({
                        ...pin,
                        lat: location.lat(),
                        lng: location.lng(),
                      });
                    } else {
                      console.error(
                        `Geocoding failed for address: ${pin.address}`,
                        status
                      );
                      resolve(pin); // Return original pin if geocoding fails
                    }
                  }
                );
              });
            }

            return pin;
          })
        );
        // Filter out pins without coordinates
        const validPins = results
          .filter((pin) => pin.lat && pin.lng)
          ?.map((pin) => ({
            ...pin,
            lng: typeof pin?.lng === "string" ? Number(pin?.lng) : pin?.lng,
            lat: typeof pin?.lat === "string" ? Number(pin?.lat) : pin?.lat,
          }));

        setGeocodedPins(validPins);
        setIsLoading(false);
      } catch (err) {
        console.error("Error geocoding addresses:", err);
        setError("Error geocoding addresses");
        setIsLoading(false);
      }
    };

    geocodePins();
  }, [mapLoaded, pins]);

  // Store map instance in a ref to prevent recreation on re-renders
  const mapInstanceRef = useRef<any>(null);

  // Store for existing markers
  const markersRef = useRef<any[]>([]);

  // Store the previous selected location ID to detect changes
  const prevSelectedLocationIdRef = useRef<string | null>(null);

  // Initialize map with geocoded pins
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || geocodedPins.length === 0 || isLoading)
      return;

    // Only initialize the map if it doesn't already exist
    if (!mapInstanceRef.current) {
      // Initialize the map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom,
        center: { lat: geocodedPins[0].lat!, lng: geocodedPins[0].lng! },
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
    } else {
      // If map already exists, just update its properties if no location is selected
      if (!selectedLocationId) {
        mapInstanceRef.current.setZoom(zoom);
        if (geocodedPins.length > 0) {
          mapInstanceRef.current.setCenter({
            lat: geocodedPins[0].lat!,
            lng: geocodedPins[0].lng!,
          });
        }
      }
    }

    // Use the existing map instance
    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      if (marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    // Add markers for each pin
    geocodedPins.forEach((pin) => {
      // Create the info window content
      const infoContent = document.createElement("div");
      infoContent.style.maxWidth = "200px";
      infoContent.style.padding = "5px";
      infoContent.innerHTML = `
        <h3 style="margin: 0 0 5px; color: #365346; font-weight: bold;">${
          pin.title
        }</h3>
        <p style="margin: 0 0 5px;">${pin.description}</p>
        ${
          pin.link
            ? `<a href="${pin.link}" target="_blank" style="color: #e2b35b; text-decoration: underline;">View Details</a>`
            : ""
        }
        ${
          selectedLocationId
            ? `<div style="margin-top: 8px;"><button id="clearSelection" style="background-color: #f3f4f6; border: 1px solid #d1d5db; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">View All Locations</button></div>`
            : ""
        }
      `;

      // Add event listener to the clear selection button if it exists
      if (selectedLocationId && onClearSelection) {
        setTimeout(() => {
          const clearButton = infoContent.querySelector("#clearSelection");
          if (clearButton) {
            clearButton.addEventListener("click", (e) => {
              e.preventDefault();
              onClearSelection();
            });
          }
        }, 0);
      }

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent,
      });

      // SVG for the marker icon
      const svgMarkup = `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#4d7a6a" stroke="#ffffff" stroke-width="1.5"/>
          <circle cx="12" cy="10" r="3" fill="#ffffff" stroke="#ffffff" stroke-width="0"/>
        </svg>
      `;

      // Check if AdvancedMarkerElement is available
      if (
        window.google.maps.marker &&
        window.google.maps.marker.AdvancedMarkerElement
      ) {
        try {
          // Create the pin SVG element
          const pinSvg = document.createElement("div");
          pinSvg.innerHTML = svgMarkup;

          // Create advanced marker
          const advancedMarker =
            new window.google.maps.marker.AdvancedMarkerElement({
              position: { lat: pin.lat!, lng: pin.lng! },
              map,
              title: pin.title,
              content: pinSvg,
            });

          // Add click listener to open info window
          advancedMarker.addListener("click", () => {
            infoWindow.open({
              anchor: advancedMarker,
              map,
            });
          });

          // Store marker in ref
          markersRef.current.push(advancedMarker);
        } catch (e) {
          console.warn(
            "AdvancedMarkerElement failed, falling back to standard Marker",
            e
          );
          // Fall back to standard marker
          createStandardMarker();
        }
      } else {
        // Fall back to standard marker if AdvancedMarkerElement is not available
        createStandardMarker();
      }

      // Function to create a standard marker as fallback
      function createStandardMarker() {
        const marker = new window.google.maps.Marker({
          position: { lat: pin.lat!, lng: pin.lng! },
          map,
          title: pin.title,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: `data:image/svg+xml;utf-8,${encodeURIComponent(svgMarkup)}`,
            size: new window.google.maps.Size(36, 48),
            anchor: new window.google.maps.Point(18, 48),
            scaledSize: new window.google.maps.Size(36, 48),
          },
        });

        // Add click listener to open info window
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        // Store marker in ref
        markersRef.current.push(marker);
      }
    });

    // Handle selected location or adjust bounds for all pins
    if (selectedLocationId) {
      // Find the selected pin
      const selectedPin = geocodedPins.find(
        (pin) => pin.id === selectedLocationId
      );

      if (selectedPin && selectedPin.lat && selectedPin.lng) {
        // Center map on selected pin and zoom in
        map.setCenter({ lat: selectedPin.lat, lng: selectedPin.lng });
        map.setZoom(17); // Higher zoom level for single location

        // Find and open the info window for the selected marker
        const selectedMarkerIndex = geocodedPins.findIndex(
          (pin) => pin.id === selectedLocationId
        );
        if (
          selectedMarkerIndex !== -1 &&
          markersRef.current[selectedMarkerIndex]
        ) {
          const marker = markersRef.current[selectedMarkerIndex];
          if (marker.content) {
            // For AdvancedMarkerElement
            setTimeout(() => {
              new window.google.maps.event.trigger(marker, "click");
            }, 300);
          } else {
            // For standard Marker
            setTimeout(() => {
              new window.google.maps.event.trigger(marker, "click");
            }, 300);
          }
        }
      }
    } else if (geocodedPins.length > 1) {
      // If no location is selected and there are multiple pins, fit bounds to show all
      const bounds = new window.google.maps.LatLngBounds();
      geocodedPins.forEach((pin) => {
        bounds.extend({ lat: pin.lat!, lng: pin.lng! });
      });
      map.fitBounds(bounds);
    }

    // Update the previous selected location ID
    prevSelectedLocationIdRef.current = selectedLocationId;
  }, [
    mapLoaded,
    geocodedPins,
    zoom,
    mapStyles,
    isLoading,
    selectedLocationId,
    onClearSelection,
  ]);

  if (error) {
    return (
      <div
        style={{
          height,
          width,
          borderRadius: "0.5rem",
          backgroundColor: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          color: "#365346",
        }}
      >
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading && mapLoaded) {
    return (
      <div
        style={{
          height,
          width,
          borderRadius: "0.5rem",
          backgroundColor: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          color: "#365346",
        }}
      >
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      style={{
        height,
        width,
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    />
  );
};

// Add TypeScript global window interface
declare global {
  interface Window {
    google: any;
    [key: string]: any; // Allow dynamic callback names
  }
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(GoogleMap, (prevProps, nextProps) => {
  // Only re-render if pins have actually changed
  if (prevProps.pins.length !== nextProps.pins.length) {
    return false; // Different number of pins, should re-render
  }

  // Check if selected location has changed
  if (prevProps.selectedLocationId !== nextProps.selectedLocationId) {
    return false; // Selected location changed, should re-render
  }

  // Check if any pin data has changed
  for (let i = 0; i < prevProps.pins.length; i++) {
    const prevPin = prevProps.pins[i];
    const nextPin = nextProps.pins[i];

    if (
      prevPin.lat !== nextPin.lat ||
      prevPin.lng !== nextPin.lng ||
      prevPin.title !== nextPin.title ||
      prevPin.address !== nextPin.address ||
      prevPin.id !== nextPin.id
    ) {
      return false; // Pin data changed, should re-render
    }
  }

  // Check if other props have changed
  if (
    prevProps.zoom !== nextProps.zoom ||
    prevProps.height !== nextProps.height ||
    prevProps.width !== nextProps.width ||
    prevProps.apiKey !== nextProps.apiKey
  ) {
    return false; // Other props changed, should re-render
  }

  return true; // No changes, prevent re-render
});
