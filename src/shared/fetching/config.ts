// WSDOT API configuration

/**
 * Base URLs for WSF API sources
 */
export const WSF_BASE_URLS = {
  vessels: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  terminals: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  schedule: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
  fares: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
} as const;

/**
 * Base URLs for WSDOT Traveler Information APIs
 */
export const WSDOT_BASE_URLS = {
  borderCrossings:
    "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
  bridgeClearances:
    "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc",
  commercialVehicleRestrictions:
    "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc",
  highwayAlerts:
    "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc",
  highwayCameras:
    "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc",
  mountainPassConditions:
    "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc",
  tollRates: "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc",
  trafficFlow:
    "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc",
  travelTimes:
    "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc",
  weatherInformation:
    "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc",
  weatherStations:
    "https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc",
  weatherInformationExtended: "https://wsdot.wa.gov/Traffic/api/api/Scanweb",
} as const;

// API source types
export type WsfSource = keyof typeof WSF_BASE_URLS;
export type WsdotSource = keyof typeof WSDOT_BASE_URLS;

// Logging modes
export type LoggingMode = "none" | "info" | "debug";

// Configuration interface
export interface WsdotConfig {
  apiKey: string;
  timeout?: number; // defaults to 10000
  retries?: number; // defaults to 3
  logLevel?: LoggingMode; // defaults to 'none'
}

// Legacy compatibility
export const API_BASES = WSF_BASE_URLS;
export const API_KEY =
  process.env.WSDOT_ACCESS_TOKEN ||
  process.env.EXPO_PUBLIC_WSDOT_ACCESS_TOKEN ||
  "";
