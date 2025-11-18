import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for weather stations endpoints
 */
export const weatherStationsGroup: EndpointGroupMeta = {
  name: "weather-stations",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Weather station metadata and location information for WSDOT Road Weather Information System stations statewide.",
    description:
      "Station identifiers, names, and location coordinates for weather stations that collect atmospheric and pavement condition data.",
    useCases: [
      "Discover weather stations by location for weather data queries.",
      "Identify station identifiers and names for weather data lookups.",
      "Support location-based weather station searches.",
    ],
    updateFrequency: "daily",
  },
};
