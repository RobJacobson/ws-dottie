import type { EndpointGroupMeta } from "@/apis/types";
import { currentWeatherForStationsMeta } from "../currentWeatherForStations";
import { searchWeatherInformationMeta } from "../searchWeatherInformation";
import { weatherInformationMeta } from "../weatherInformation";
import { weatherInformationByStationIdMeta } from "../weatherInformationByStationId";

/**
 * Endpoint group metadata for weather information endpoints
 */
export const weatherInfoGroup: EndpointGroupMeta = {
  name: "weather-info",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Current atmospheric conditions from WSDOT Road Weather Information System stations.",
    description:
      "Real-time temperature, humidity, wind conditions, visibility, barometric pressure, and precipitation data for transportation operations.",
    useCases: [
      "Assess road weather conditions for transportation management.",
      "Monitor atmospheric data for traveler safety decisions.",
      "Display current weather conditions at specific stations.",
      "Query historical weather data by station and time range.",
    ],
    updateFrequency: "5m",
  },
};

/**
 * Aggregated endpoint metadata for the weather information group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const weatherInfoEndpoints = {
  weatherInformation: weatherInformationMeta,
  weatherInformationByStationId: weatherInformationByStationIdMeta,
  currentWeatherForStations: currentWeatherForStationsMeta,
  searchWeatherInformation: searchWeatherInformationMeta,
} as const;
