// WSDOT fetch utilities

import { API_KEY, type LoggingMode } from "./config";
import { fetchInternal } from "./fetchInternal";

export const WSDOT_BASE_URLS = {
  borderCrossings: "BorderCrossings/BorderCrossingsREST.svc",
  bridgeClearances: "Bridges/ClearanceREST.svc",
  commercialVehicleRestrictions: "CVRestrictions/CVRestrictionsREST.svc",
  highwayAlerts: "HighwayAlerts/HighwayAlertsREST.svc",
  highwayCameras: "HighwayCameras/HighwayCamerasREST.svc",
  mountainPassConditions:
    "MountainPassConditions/MountainPassConditionsREST.svc",
  tollRates: "TollRates/TollRatesREST.svc",
  trafficFlow: "TrafficFlow/TrafficFlowREST.svc",
  travelTimes: "TravelTimes/TravelTimesREST.svc",
  weatherInformation: "WeatherInformation/WeatherInformationREST.svc",
  weatherStations: "WeatherStations/WeatherStationsREST.svc",
  weatherInformationExtended: "api/Scanweb",
} as const;

/**
 * Fetches data from WSDOT Traveler Information API with a complete URL
 *
 * @param source - The WSDOT API source (e.g., "highwayCameras", "trafficFlow")
 * @param endpoint - The complete API endpoint path (e.g., "/GetCamerasAsJson")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to the API response or throws WsdotApiError if fetch fails
 */
export const fetchWsdot = async <T>(
  source: keyof typeof WSDOT_BASE_URLS,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T> => {
  const endpointUrl = WSDOT_BASE_URLS[source];
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `https://wsdot.wa.gov/Traffic/api/${endpointUrl}${endpoint}${separator}AccessCode=${API_KEY}`;
  return await fetchInternal<T>(url, endpoint, logMode);
};
