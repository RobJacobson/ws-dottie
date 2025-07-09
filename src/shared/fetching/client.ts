// WSDOT API client factory

import type { WsdotConfig, WsdotSource, WsfSource } from "./config";
import { WSDOT_BASE_URLS, WSF_BASE_URLS } from "./config";
import { fetchInternal } from "./fetchInternal";
import { buildUrl, logError } from "./urlBuilder";

/**
 * Configuration validation
 */
const validateConfig = (config: WsdotConfig): Required<WsdotConfig> => {
  if (!config.apiKey) {
    throw new Error("API key is required");
  }

  return {
    timeout: 10000,
    retries: 3,
    logLevel: "none",
    ...config,
  };
};

/**
 * Base fetch function for WSF APIs
 */
const fetchWsfArray = async <T>(
  config: Required<WsdotConfig>,
  source: WsfSource,
  endpoint: string
): Promise<T[]> => {
  try {
    const baseUrl = WSF_BASE_URLS[source];
    const url = `${baseUrl}${endpoint}?api_key=${config.apiKey}`;

    const response = await fetchInternal<T[]>(url, endpoint, config.logLevel);
    return response || [];
  } catch (error) {
    logError(config, endpoint, error);
    return [];
  }
};

/**
 * Base fetch function for WSDOT APIs
 */
const fetchWsdArray = async <T>(
  config: Required<WsdotConfig>,
  source: WsdotSource,
  endpoint: string
): Promise<T[]> => {
  try {
    const baseUrl = WSDOT_BASE_URLS[source];
    const url = `${baseUrl}${endpoint}?api_key=${config.apiKey}`;

    const response = await fetchInternal<T[]>(url, endpoint, config.logLevel);
    return response || [];
  } catch (error) {
    logError(config, endpoint, error);
    return [];
  }
};

/**
 * WSF Schedule API factory
 */
const createWsfScheduleApi = (config: Required<WsdotConfig>) => ({
  getRoutes: (tripDate: Date) =>
    fetchWsfArray<Route>(
      config,
      "schedule",
      buildUrl("/routes/{tripDate}", { tripDate })
    ),

  getRoutesByTerminals: (params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  }) =>
    fetchWsfArray<Route>(
      config,
      "schedule",
      buildUrl(
        "/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
        params
      )
    ),

  getRoutesWithDisruptions: (tripDate: Date) =>
    fetchWsfArray<Route>(
      config,
      "schedule",
      buildUrl("/routeshavingservicedisruptions/{tripDate}", { tripDate })
    ),

  getRouteDetails: (tripDate: Date) =>
    fetchWsfArray<Route>(
      config,
      "schedule",
      buildUrl("/routedetails/{tripDate}", { tripDate })
    ),

  getRouteDetailsByTerminals: (params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  }) =>
    fetchWsfArray<Route>(
      config,
      "schedule",
      buildUrl(
        "/routedetails/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
        params
      )
    ),

  getRouteDetailsByRoute: (params: { tripDate: Date; routeId: number }) =>
    fetchWsfArray<Route>(
      config,
      "schedule",
      buildUrl("/routedetails/{tripDate}/{routeId}", params)
    ),

  getScheduledRoutes: () =>
    fetchWsfArray<Route>(config, "schedule", "/schedroutes"),

  getScheduledRoutesBySeason: (seasonId: number) =>
    fetchWsfArray<Route>(
      config,
      "schedule",
      buildUrl("/schedroutes/{seasonId}", { seasonId })
    ),

  getActiveSeasons: () =>
    fetchWsfArray<Route>(config, "schedule", "/activeseasons"),

  getAlerts: () => fetchWsfArray<Route>(config, "schedule", "/alerts"),
});

/**
 * WSF Vessels API factory
 */
const createWsfVesselsApi = (config: Required<WsdotConfig>) => ({
  // Vessel Locations
  getVesselLocations: () =>
    fetchWsfArray<VesselLocation>(config, "vessels", "/vessellocations"),

  getVesselLocationsByVesselId: (vesselId: number) =>
    fetchWsfArray<VesselLocation>(
      config,
      "vessels",
      buildUrl("/vessellocations/{vesselId}", { vesselId })
    ),

  // Vessel Verbose (Detailed Information)
  getVesselVerbose: () =>
    fetchWsfArray<VesselVerbose>(config, "vessels", "/vesselverbose"),

  getVesselVerboseByVesselId: (vesselId: number) =>
    fetchWsfArray<VesselVerbose>(
      config,
      "vessels",
      buildUrl("/vesselverbose/{vesselId}", { vesselId })
    ),
});

/**
 * WSF Fares API factory
 */
const createWsfFaresApi = (config: Required<WsdotConfig>) => ({
  // Fares
  getFares: () => fetchWsfArray<Fare>(config, "fares", "/fares"),

  getFareById: (fareId: number) =>
    fetchWsfArray<Fare>(
      config,
      "fares",
      buildUrl("/fares/{fareId}", { fareId })
    ),

  // Fare Categories
  getFareCategories: () =>
    fetchWsfArray<FareCategory>(config, "fares", "/farecategories"),

  getFareCategoryById: (categoryId: number) =>
    fetchWsfArray<FareCategory>(
      config,
      "fares",
      buildUrl("/farecategories/{categoryId}", { categoryId })
    ),

  // Fare Types
  getFareTypes: () => fetchWsfArray<FareType>(config, "fares", "/faretypes"),

  getFareTypeById: (typeId: number) =>
    fetchWsfArray<FareType>(
      config,
      "fares",
      buildUrl("/faretypes/{typeId}", { typeId })
    ),

  // Route Fares
  getRouteFares: () => fetchWsfArray<RouteFare>(config, "fares", "/routefares"),

  getRouteFaresByRouteId: (routeId: number) =>
    fetchWsfArray<RouteFare>(
      config,
      "fares",
      buildUrl("/routefares/{routeId}", { routeId })
    ),

  // Terminal Fares
  getTerminalFares: () =>
    fetchWsfArray<TerminalFare>(config, "fares", "/terminalfares"),

  getTerminalFaresByTerminalId: (terminalId: number) =>
    fetchWsfArray<TerminalFare>(
      config,
      "fares",
      buildUrl("/terminalfares/{terminalId}", { terminalId })
    ),
});

/**
 * WSF Terminals API factory
 */
const createWsfTerminalsApi = (config: Required<WsdotConfig>) => ({
  // Terminal Basics
  getTerminalBasics: () =>
    fetchWsfArray<TerminalBasics>(config, "terminals", "/terminalbasics"),

  getTerminalBasicsByTerminalId: (terminalId: number) =>
    fetchWsfArray<TerminalBasics>(
      config,
      "terminals",
      buildUrl("/terminalbasics/{terminalId}", { terminalId })
    ),

  // Terminal Sailing Space
  getTerminalSailingSpace: () =>
    fetchWsfArray<TerminalSailingSpace>(
      config,
      "terminals",
      "/terminalsailingspace"
    ),

  getTerminalSailingSpaceByTerminalId: (terminalId: number) =>
    fetchWsfArray<TerminalSailingSpace>(
      config,
      "terminals",
      buildUrl("/terminalsailingspace/{terminalId}", { terminalId })
    ),

  getTerminalSailingSpaceByRoute: (routeId: number) =>
    fetchWsfArray<TerminalSailingSpace>(
      config,
      "terminals",
      buildUrl("/terminalsailingspace/route/{routeId}", { routeId })
    ),

  getTerminalSailingSpaceByTerminalAndRoute: (params: {
    terminalId: number;
    routeId: number;
  }) =>
    fetchWsfArray<TerminalSailingSpace>(
      config,
      "terminals",
      buildUrl(
        "/terminalsailingspace/terminal/{terminalId}/route/{routeId}",
        params
      )
    ),

  // Terminal Verbose
  getTerminalVerbose: () =>
    fetchWsfArray<TerminalVerbose>(config, "terminals", "/terminalverbose"),

  getTerminalVerboseByTerminalId: (terminalId: number) =>
    fetchWsfArray<TerminalVerbose>(
      config,
      "terminals",
      buildUrl("/terminalverbose/{terminalId}", { terminalId })
    ),

  // Terminal Locations
  getTerminalLocations: () =>
    fetchWsfArray<TerminalLocation>(config, "terminals", "/terminallocations"),

  getTerminalLocationsByTerminalId: (terminalId: number) =>
    fetchWsfArray<TerminalLocation>(
      config,
      "terminals",
      buildUrl("/terminallocations/{terminalId}", { terminalId })
    ),

  // Terminal Wait Times
  getTerminalWaitTimes: () =>
    fetchWsfArray<TerminalWaitTime>(config, "terminals", "/terminalwaittimes"),

  getTerminalWaitTimesByRoute: (routeId: number) =>
    fetchWsfArray<TerminalWaitTime>(
      config,
      "terminals",
      buildUrl("/terminalwaittimes/{routeId}", { routeId })
    ),

  getTerminalWaitTimesByTerminal: (terminalId: number) =>
    fetchWsfArray<TerminalWaitTime>(
      config,
      "terminals",
      buildUrl("/terminalwaittimes/{terminalId}", { terminalId })
    ),

  getTerminalWaitTimesByRouteAndTerminal: (params: {
    routeId: number;
    terminalId: number;
  }) =>
    fetchWsfArray<TerminalWaitTime>(
      config,
      "terminals",
      buildUrl("/terminalwaittimes/{routeId}/{terminalId}", params)
    ),
});

/**
 * WSF API factory
 */
const createWsfApi = (config: Required<WsdotConfig>) => ({
  schedule: createWsfScheduleApi(config),
  vessels: createWsfVesselsApi(config),
  fares: createWsfFaresApi(config),
  terminals: createWsfTerminalsApi(config),
});

/**
 * WSDOT Traffic API factory
 */
const createWsdTrafficApi = (config: Required<WsdotConfig>) => ({
  getHighwayCameras: () =>
    fetchWsdArray<HighwayCamera>(config, "highwayCameras", "/GetCamerasAsJson"),

  getHighwayCamerasByRegion: (region: string) =>
    fetchWsdArray<HighwayCamera>(
      config,
      "highwayCameras",
      buildUrl("/GetCamerasAsJson?Region={region}", { region })
    ),

  getTrafficFlow: () =>
    fetchWsdArray<TrafficFlow>(config, "trafficFlow", "/GetTrafficFlowAsJson"),

  getTrafficFlowByRegion: (region: string) =>
    fetchWsdArray<TrafficFlow>(
      config,
      "trafficFlow",
      buildUrl("/GetTrafficFlowAsJson?Region={region}", { region })
    ),

  getTravelTimes: () =>
    fetchWsdArray<TravelTime>(config, "travelTimes", "/GetTravelTimesAsJson"),

  getTravelTimesByRegion: (region: string) =>
    fetchWsdArray<TravelTime>(
      config,
      "travelTimes",
      buildUrl("/GetTravelTimesAsJson?Region={region}", { region })
    ),

  getHighwayAlerts: () =>
    fetchWsdArray<HighwayAlert>(config, "highwayAlerts", "/GetAlertsAsJson"),

  getHighwayAlertsByRegion: (region: string) =>
    fetchWsdArray<HighwayAlert>(
      config,
      "highwayAlerts",
      buildUrl("/GetAlertsAsJson?Region={region}", { region })
    ),

  getMountainPassConditions: () =>
    fetchWsdArray<MountainPassCondition>(
      config,
      "mountainPassConditions",
      "/GetMountainPassConditionsAsJson"
    ),
});

/**
 * WSDOT API factory
 */
const createWsdApi = (config: Required<WsdotConfig>) => ({
  traffic: createWsdTrafficApi(config),
});

/**
 * Main client factory
 */
export const createWsdotClient = (config: WsdotConfig) => {
  const validatedConfig = validateConfig(config);

  return {
    wsf: createWsfApi(validatedConfig),
    wsdot: createWsdApi(validatedConfig),
    config: validatedConfig,
  };
};

// Type exports for consumers
export type WsdotClient = ReturnType<typeof createWsdotClient>;
export type WsfApi = ReturnType<typeof createWsfApi>;
export type WsdApi = ReturnType<typeof createWsdApi>;

// Placeholder types - these should be imported from actual type files
type Route = any;
type VesselLocation = any;
type VesselVerbose = any;
type Fare = any;
type FareCategory = any;
type FareType = any;
type RouteFare = any;
type TerminalFare = any;
type TerminalBasics = any;
type TerminalSailingSpace = any;
type TerminalVerbose = any;
type TerminalLocation = any;
type TerminalWaitTime = any;
type HighwayCamera = any;
type TrafficFlow = any;
type TravelTime = any;
type HighwayAlert = any;
type MountainPassCondition = any;
