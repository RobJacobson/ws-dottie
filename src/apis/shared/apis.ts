import type { ApiMetadata } from "@/apis/types";

export const apis: Record<string, ApiMetadata> = {
  wsfSchedule: {
    name: "wsf-schedule",
    baseUrl: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
  },
  wsfVessels: {
    name: "wsf-vessels",
    baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  },
  wsfTerminals: {
    name: "wsf-terminals",
    baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  },
  wsfFares: {
    name: "wsf-fares",
    baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
  },
  wsdotBorderCrossings: {
    name: "wsdot-border-crossings",
    baseUrl:
      "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
  },
  wsdotBridgeClearances: {
    name: "wsdot-bridge-clearances",
    baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  },
  wsdotCommercialVehicleRestrictions: {
    name: "wsdot-commercial-vehicle-restrictions",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  },
  wsdotHighwayAlerts: {
    name: "wsdot-highway-alerts",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  },
  wsdotHighwayCameras: {
    name: "wsdot-highway-cameras",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
  },
  wsdotMountainPassConditions: {
    name: "wsdot-mountain-pass-conditions",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
  },
  wsdotTollRates: {
    name: "wsdot-toll-rates",
    baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  },
  wsdotTrafficFlow: {
    name: "wsdot-traffic-flow",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
  },
  wsdotTravelTimes: {
    name: "wsdot-travel-times",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
  },
  wsdotWeatherInformation: {
    name: "wsdot-weather-information",
    baseUrl:
      "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
  },
  wsdotWeatherReadings: {
    name: "wsdot-weather-readings",
    baseUrl: "https://www.wsdot.wa.gov/traffic/api/api",
  },
  wsdotWeatherStations: {
    name: "wsdot-weather-stations",
    baseUrl:
      "https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc",
  },
};
