import * as _tanstack_react_query from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

/**
 * Valid date range information from WSF API
 * Based on /validdaterange endpoint
 */
type ValidDateRange = {
    startDate: Date;
    endDate: Date;
};
/**
 * Route information from WSF Schedule API
 * Based on /routes endpoint
 */
type Route = {
    routeId: number;
    routeName: string;
    routeAbbrev: string;
    routeDescription: string;
    routeColor: string;
    sortSeq: number;
    crossingTime: number;
    distance: number;
    isActive: boolean;
    serviceRoutes: ServiceRoute[];
};
/**
 * Service route information
 */
type ServiceRoute = {
    serviceRouteId: number;
    serviceRouteName: string;
    serviceRouteAbbrev: string;
    isActive: boolean;
};
/**
 * Schedule departure information
 */
type ScheduleDeparture = {
    sailingId: number;
    schedRouteId: number;
    departureTime: Date;
    arrivalTime: Date;
    vesselId: number;
    vesselName: string;
    departingTerminalId: number;
    departingTerminalName: string;
    arrivingTerminalId: number;
    arrivingTerminalName: string;
    isCancelled: boolean;
    notes?: string;
    lastUpdated: Date;
};
/**
 * Schedule information
 */
type Schedule = {
    routeId: number;
    routeName: string;
    sailingDate: Date;
    departures: ScheduleDeparture[];
    lastUpdated: Date;
};
/**
 * Alert information
 */
type Alert = {
    alertId: number;
    routeId: number;
    routeName: string;
    alertTitle: string;
    alertMessage: string;
    startDate: Date;
    endDate: Date;
    severity: "low" | "medium" | "high";
    isActive: boolean;
};
/**
 * Active season information
 */
type ActiveSeason = {
    seasonId: number;
    seasonName: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    routeIds: number[];
};
/**
 * Time adjustment information
 */
type TimeAdjustment = {
    adjustmentId: number;
    routeId: number;
    sailingId: number;
    adjustmentMinutes: number;
    adjustmentReason: string;
    effectiveDate: Date;
    isActive: boolean;
};
/**
 * Schedule query parameters
 */
type ScheduleParams = {
    routeId?: number;
    sailingDate?: Date;
    vesselId?: number;
    terminalId?: number;
};
/**
 * Route query parameters
 */
type RouteParams = {
    isActive?: boolean;
    terminalId?: number;
};
/**
 * Time adjustment query parameters
 */
type TimeAdjustmentParams = {
    routeId?: number;
    sailingDate?: Date;
    isActive?: boolean;
};
/**
 * Alert query parameters
 */
type AlertParams = {
    routeId?: number;
    severity?: "low" | "medium" | "high";
    isActive?: boolean;
};
/**
 * Active season query parameters
 */
type ActiveSeasonParams = {
    isActive?: boolean;
    routeId?: number;
};
/**
 * Schedule cache flush date response
 */
type ScheduleCacheFlushDate = {
    lastUpdated: Date;
    source: string;
};

/**
 * API function for fetching all routes from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * Valid trip dates may be determined using the validDateRange endpoint.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of Route objects containing basic route information
 */
declare const getRoutes: (tripDate: Date) => Promise<Route[]>;
/**
 * API function for fetching routes between specific terminals from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes filtered by departing
 * and arriving terminals for a given trip date. Routes in the resultset are filtered
 * to match the specified terminal combination. Valid departing and arriving terminals
 * may be found using the terminalsAndMates endpoint.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of Route objects filtered by terminal combination
 */
declare const getRoutesByTerminals: (params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
}) => Promise<Route[]>;
/**
 * API function for fetching routes with service disruptions from WSF Schedule API
 *
 * Retrieves the most basic/brief information for routes currently associated with
 * service disruptions for a given trip date. This endpoint helps identify routes
 * that may have delays, cancellations, or other service issues.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of Route objects that have service disruptions
 */
declare const getRoutesWithDisruptions: (tripDate: Date) => Promise<Route[]>;
/**
 * API function for fetching detailed route information from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * This endpoint provides comprehensive route details including sailing times, vessel assignments,
 * and operational information.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of Route objects containing detailed route information
 */
declare const getRouteDetails: (tripDate: Date) => Promise<Route[]>;
/**
 * API function for fetching detailed route information between specific terminals from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes filtered by departing and
 * arriving terminals for a given trip date. Routes in the resultset are filtered to match
 * the specified terminal combination. Valid departing and arriving terminals may be found
 * using the terminalsAndMates endpoint.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of Route objects with detailed information filtered by terminal combination
 */
declare const getRouteDetailsByTerminals: (params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
}) => Promise<Route[]>;
/**
 * API function for fetching detailed route information by route ID from WSF Schedule API
 *
 * Retrieves highly detailed information for a specific route identified by route ID
 * for a given trip date. This endpoint filters the resultset to a single route,
 * providing comprehensive details for that specific route.
 *
 * @param params - Object containing trip date and route information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.routeId - The unique identifier for the route
 * @returns Promise resolving to an array of Route objects containing detailed information for the specified route
 */
declare const getRouteDetailsByRoute: (params: {
    tripDate: Date;
    routeId: number;
}) => Promise<Route[]>;
/**
 * API function for fetching scheduled routes from WSF Schedule API
 *
 * Provides a listing of routes that are active for a season. Results include all known
 * scheduled routes spanning current and upcoming seasons. For example, "Anacortes / Sidney B.C."
 * may be a valid route, but if it's not scheduled to run during a specific season,
 * it won't be returned as part of that season's scheduled routes resultset.
 *
 * @returns Promise resolving to an array of Route objects representing all scheduled routes
 */
declare const getScheduledRoutes: () => Promise<Route[]>;
/**
 * API function for fetching scheduled routes by season from WSF Schedule API
 *
 * Provides a listing of routes that are active for a specific season identified by schedule ID.
 * Results are filtered to only include scheduled routes for the specified season.
 * Seasons may be determined using the activeSeasons endpoint.
 *
 * @param seasonId - The unique identifier for the season (schedule ID)
 * @returns Promise resolving to an array of Route objects representing scheduled routes for the specified season
 */
declare const getScheduledRoutesBySeason: (seasonId: number) => Promise<Route[]>;
/**
 * API function for fetching active seasons from WSF Schedule API
 *
 * Retrieves a summary of active seasons. This endpoint provides information about
 * current and upcoming ferry service seasons, which can be used to determine
 * valid schedule IDs for other endpoints.
 *
 * @returns Promise resolving to an array of Route objects containing active season information
 */
declare const getActiveSeasons: () => Promise<Route[]>;
/**
 * API function for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @returns Promise resolving to an array of Route objects containing alert information
 */
declare const getAlerts: () => Promise<Route[]>;

/**
 * Hook for fetching all routes from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * Valid trip dates may be determined using the validDateRange endpoint.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns React Query result containing an array of Route objects with basic route information
 */
declare const useRoutes: (tripDate: Date) => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching routes between specific terminals from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes filtered by departing
 * and arriving terminals for a given trip date. Routes in the resultset are filtered
 * to match the specified terminal combination. Valid departing and arriving terminals
 * may be found using the terminalsAndMates endpoint.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns React Query result containing an array of Route objects filtered by terminal combination
 */
declare const useRoutesByTerminals: (params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
}) => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching routes with service disruptions from WSF Schedule API
 *
 * Retrieves the most basic/brief information for routes currently associated with
 * service disruptions for a given trip date. This endpoint helps identify routes
 * that may have delays, cancellations, or other service issues.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns React Query result containing an array of Route objects that have service disruptions
 */
declare const useRoutesWithDisruptions: (tripDate: Date) => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching route details from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * This endpoint provides comprehensive route details including sailing times, vessel assignments,
 * and operational information.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns React Query result containing an array of Route objects with detailed route information
 */
declare const useRouteDetails: (tripDate: Date) => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching route details by terminals from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes filtered by departing and
 * arriving terminals for a given trip date. Routes in the resultset are filtered to match
 * the specified terminal combination. Valid departing and arriving terminals may be found
 * using the terminalsAndMates endpoint.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns React Query result containing an array of Route objects with detailed information filtered by terminal combination
 */
declare const useRouteDetailsByTerminals: (params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
}) => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching route details by route from WSF Schedule API
 *
 * Retrieves highly detailed information for a specific route identified by route ID
 * for a given trip date. This endpoint filters the resultset to a single route,
 * providing comprehensive details for that specific route.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param routeId - The unique identifier for the route
 * @returns React Query result containing an array of Route objects with detailed information for the specified route
 */
declare const useRouteDetailsByRoute: (tripDate: Date, routeId: number) => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching scheduled routes from WSF Schedule API
 *
 * Provides a listing of routes that are active for a season. Results include all known
 * scheduled routes spanning current and upcoming seasons. For example, "Anacortes / Sidney B.C."
 * may be a valid route, but if it's not scheduled to run during a specific season,
 * it won't be returned as part of that season's scheduled routes resultset.
 *
 * @returns React Query result containing an array of Route objects representing all scheduled routes
 */
declare const useScheduledRoutes: () => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching scheduled routes by season from WSF Schedule API
 *
 * Provides a listing of routes that are active for a specific season identified by schedule ID.
 * Results are filtered to only include scheduled routes for the specified season.
 * Seasons may be determined using the activeSeasons endpoint.
 *
 * @param seasonId - The unique identifier for the season (schedule ID)
 * @returns React Query result containing an array of Route objects representing scheduled routes for the specified season
 */
declare const useScheduledRoutesBySeason: (seasonId: number) => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching active seasons from WSF Schedule API
 *
 * Retrieves a summary of active seasons. This endpoint provides information about
 * current and upcoming ferry service seasons, which can be used to determine
 * valid schedule IDs for other endpoints.
 *
 * @returns React Query result containing an array of Route objects with active season information
 */
declare const useActiveSeasons: () => _tanstack_react_query.UseQueryResult<Route[], Error>;
/**
 * Hook for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @returns React Query result containing an array of Route objects with alert information
 */
declare const useAlerts: () => _tanstack_react_query.UseQueryResult<Route[], Error>;

/**
 * API function for fetching schedule by route from WSF Schedule API
 */
declare const getScheduleByRoute: (params: {
    tripDate: Date;
    routeID: number;
}) => Promise<Schedule[]>;
/**
 * API function for fetching schedule by terminals from WSF Schedule API
 */
declare const getScheduleByTerminals: (params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
}) => Promise<Schedule[]>;
/**
 * API function for fetching today's schedule by route from WSF Schedule API
 */
declare const getScheduleTodayByRoute: (params: {
    routeID: number;
    onlyRemainingTimes?: boolean;
}) => Promise<Schedule[]>;
/**
 * API function for fetching today's schedule by terminals from WSF Schedule API
 */
declare const getScheduleTodayByTerminals: (params: {
    departingTerminalID: number;
    arrivingTerminalID: number;
    onlyRemainingTimes?: boolean;
}) => Promise<Schedule[]>;
/**
 * API function for fetching sailings from WSF Schedule API
 */
declare const getSailings: (params: {
    schedRouteID: number;
}) => Promise<ScheduleDeparture[]>;
/**
 * API function for fetching all sailings from WSF Schedule API
 */
declare const getAllSailings: (params: {
    schedRouteID: number;
    year: number;
}) => Promise<ScheduleDeparture[]>;

/**
 * Hook for fetching schedule by route from WSF Schedule API
 *
 * Retrieves schedule information for a specific route and date.
 * This data is updated infrequently and provides static schedule
 * information used in route-specific scheduling contexts.
 *
 * @param tripDate - The trip date for the schedule
 * @param routeId - The route ID to get schedule for
 * @returns React Query result containing Schedule data
 */
declare const useScheduleByRoute: (tripDate: Date, routeId: number) => _tanstack_react_query.UseQueryResult<Schedule[], Error>;
/**
 * Hook for fetching schedule by terminals from WSF Schedule API
 *
 * Retrieves schedule information for a specific terminal pair and date.
 * This data is updated infrequently and provides static schedule
 * information used in terminal-specific scheduling contexts.
 *
 * @param params - Object containing trip date and terminal IDs
 * @returns React Query result containing Schedule data
 */
declare const useScheduleByTerminals: (params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
}) => _tanstack_react_query.UseQueryResult<Schedule[], Error>;
/**
 * Hook for fetching today's schedule by route from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific route.
 * This data is updated infrequently and provides static schedule
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get today's schedule for
 * @returns React Query result containing Schedule data
 */
declare const useScheduleTodayByRoute: (routeId: number) => _tanstack_react_query.UseQueryResult<Schedule[], Error>;
/**
 * Hook for fetching today's schedule by terminals from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific terminal pair.
 * This data is updated infrequently and provides static schedule
 * information used in terminal-specific scheduling contexts.
 *
 * @param params - Object containing terminal IDs
 * @returns React Query result containing Schedule data
 */
declare const useScheduleTodayByTerminals: (params: {
    departingTerminalID: number;
    arrivingTerminalID: number;
}) => _tanstack_react_query.UseQueryResult<Schedule[], Error>;
/**
 * Hook for fetching sailings from WSF Schedule API
 *
 * Retrieves sailing information for a specific scheduled route.
 * This data is updated infrequently and provides static sailing
 * information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get sailings for
 * @returns React Query result containing an array of Sailing objects
 */
declare const useSailings: (schedRouteID: number) => _tanstack_react_query.UseQueryResult<ScheduleDeparture[], Error>;
/**
 * Hook for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailing information for a specific scheduled route and year.
 * This data is updated infrequently and provides static sailing
 * information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get sailings for
 * @param year - The year to get sailings for
 * @returns React Query result containing an array of Sailing objects
 */
declare const useAllSailings: (schedRouteID: number, year: number) => _tanstack_react_query.UseQueryResult<ScheduleDeparture[], Error>;

/**
 * Terminal basics from WSF Terminals API
 * Based on /terminalbasics endpoint
 */
type TerminalBasics = {
    terminalId: number;
    terminalName: string;
    terminalAbbrev: string;
    latitude: number;
    longitude: number;
    address: string;
    phone: string;
    hasWaitTime: boolean;
    hasSpaceAvailable: boolean;
    isActive: boolean;
};
/**
 * Terminal bulletins from WSF Terminals API
 * Based on /terminalbulletins endpoint
 */
type TerminalBulletin = {
    terminalId: number;
    bulletinId: number;
    bulletinTitle: string;
    bulletinMessage: string;
    bulletinDate: Date;
    isActive: boolean;
};
/**
 * Terminal locations from WSF Terminals API
 * Based on /terminallocations endpoint
 */
type TerminalLocation = {
    terminalId: number;
    terminalName: string;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    county: string;
    gisZoomLocation: {
        latitude: number;
        longitude: number;
        zoomLevel: number;
    };
    isActive: boolean;
};
/**
 * Terminal sailing space from WSF Terminals API
 * Based on /terminalsailingspace endpoint
 */
type TerminalSailingSpace = {
    terminalId: number;
    terminalName: string;
    sailingId: number;
    departureTime: Date;
    driveUpSpaces: number;
    reservationSpaces: number;
    totalSpaces: number;
    isActive: boolean;
};
/**
 * Terminal transports from WSF Terminals API
 * Based on /terminaltransports endpoint
 */
type TerminalTransport = {
    terminalId: number;
    terminalName: string;
    transportId: number;
    transportType: string;
    transportName: string;
    transportDescription: string;
    transportNotes: string;
    isActive: boolean;
};
/**
 * Terminal wait times from WSF Terminals API
 * Based on /terminalwaittimes endpoint
 */
type TerminalWaitTime = {
    terminalId: number;
    terminalName: string;
    waitTimeId: number;
    waitTimeType: "vehicle" | "passenger";
    waitTimeMinutes: number;
    waitTimeDescription: string;
    lastUpdated: Date;
    isActive: boolean;
};
/**
 * Terminal verbose from WSF Terminals API
 * Based on /terminalverbose endpoint
 */
type TerminalVerbose = {
    terminalId: number;
    terminalName: string;
    terminalAbbrev: string;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    county: string;
    phone: string;
    hasWaitTime: boolean;
    hasSpaceAvailable: boolean;
    gisZoomLocation: {
        latitude: number;
        longitude: number;
        zoomLevel: number;
    };
    transitLinks: TerminalTransport[];
    waitTimes: TerminalWaitTime[];
    bulletins: TerminalBulletin[];
    sailingSpaces: TerminalSailingSpace[];
    isActive: boolean;
};
/**
 * Terminals cache flush date response
 */
type TerminalsCacheFlushDate = {
    lastUpdated: Date;
    source: string;
};

/**
 * API function for fetching all terminals from WSF Schedule API
 *
 * Retrieves all valid departing terminals for a specific trip date.
 *
 * @param tripDate - The date for which to get terminal information
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
declare const getTerminals: (tripDate: Date) => Promise<TerminalBasics[]>;
/**
 * API function for fetching terminals by route from WSF Schedule API
 *
 * Retrieves all terminal combinations for a specific route.
 *
 * @param routeId - The route ID to get terminals for
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
declare const getTerminalsByRoute: (routeId: number) => Promise<TerminalBasics[]>;
/**
 * API function for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all terminal combinations (departing and arriving) for a specific trip date.
 *
 * @param tripDate - The date for which to get terminal combinations
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
declare const getTerminalsAndMates: (tripDate: Date) => Promise<TerminalBasics[]>;
/**
 * API function for fetching terminal mates from WSF Schedule API
 *
 * Retrieves all arriving terminals for a specific departing terminal on a given date.
 *
 * @param tripDate - The date for which to get terminal mates
 * @param terminalId - The departing terminal ID
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
declare const getTerminalMates: (tripDate: Date, terminalId: number) => Promise<TerminalBasics[]>;

/**
 * Hook for fetching all terminals from WSF Schedule API
 *
 * Retrieves terminal information for schedule-related operations.
 * This data is updated infrequently and provides static terminal
 * information used in scheduling contexts.
 *
 * @param tripDate - The date for which to get terminal information
 * @returns React Query result with ScheduleTerminal array data
 */
declare const useTerminals: (tripDate: Date) => _tanstack_react_query.UseQueryResult<TerminalBasics[], Error>;
/**
 * Hook for fetching terminals by route from WSF Schedule API
 *
 * Retrieves terminal information for a specific route.
 * This data is updated infrequently and provides static terminal
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get terminals for
 * @returns React Query result with ScheduleTerminal array data
 */
declare const useTerminalsByRoute: (routeId: number) => _tanstack_react_query.UseQueryResult<TerminalBasics[], Error>;
/**
 * Hook for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves terminal combinations for schedule-related operations.
 * This data is updated infrequently and provides static terminal
 * pairing information used in scheduling contexts.
 *
 * @param tripDate - The date for which to get terminal combinations
 * @returns React Query result with ScheduleTerminal array data
 */
declare const useTerminalsAndMates: (tripDate: Date) => _tanstack_react_query.UseQueryResult<TerminalBasics[], Error>;
/**
 * Hook for fetching terminal mates from WSF Schedule API
 *
 * Retrieves terminal mate information for a specific terminal.
 * This data is updated infrequently and provides static terminal
 * pairing information used in scheduling contexts.
 *
 * @param tripDate - The date for which to get terminal mates
 * @param terminalId - The departing terminal ID
 * @returns React Query result with ScheduleTerminal array data
 */
declare const useTerminalMates: (tripDate: Date, terminalId: number) => _tanstack_react_query.UseQueryResult<TerminalBasics[], Error>;

/**
 * Vessel information from WSF Vessels API
 * Based on /vesselbasics endpoint
 */
type Vessel = {
    vesselId: number;
    vesselName: string;
    abbrev: string;
    vesselClass: string;
    inService: boolean;
    active: boolean;
    yearBuilt: number;
    displacement: number;
    length: number;
    breadth: number;
    draft: number;
    carCapacity: number;
    passengerCapacity: number;
    maxPassengers: number;
    maxVehicles: number;
    maxGrossTonnage: number;
    horsepower: number;
    maxSpeed: number;
    homeTerminalId: number;
    homeTerminalName: string;
};
/**
 * Vessel accommodations from WSF Vessels API
 * Based on /vesselaccommodations endpoint
 */
type VesselAccommodation = {
    vesselId: number;
    accommodationId: number;
    accommodationName: string;
    accommodationDescription: string;
    isActive: boolean;
};
/**
 * Vessel statistics from WSF Vessels API
 * Based on /vesselstats endpoint
 */
type VesselStats = {
    vesselId: number;
    statId: number;
    statName: string;
    statValue: string;
    statUnit: string;
    isActive: boolean;
};
/**
 * Vessel location from WSF Vessels API
 * Based on /vessellocations endpoint
 */
type VesselLocation = {
    vesselID: number;
    vesselName: string;
    longitude: number;
    latitude: number;
    heading: number;
    speed: number;
    inService: boolean;
    atDock: boolean;
    departingTerminalId: number;
    departingTerminalName: string;
    arrivingTerminalId: number;
    arrivingTerminalName: string;
    scheduledDeparture: Date;
    estimatedArrival: Date;
    lastUpdated: Date;
    leftDock?: Date;
    eta?: Date;
    opRouteAbbrev?: string[];
    vesselPositionNum?: number;
    sortSeq?: number;
    managedBy?: number;
    timestamp?: Date;
};
/**
 * Vessel verbose information from WSF Vessels API
 * Based on /vesselverbose endpoint
 */
type VesselVerbose = {
    vesselId: number;
    vesselName: string;
    abbrev: string;
    vesselClass: string;
    inService: boolean;
    active: boolean;
    yearBuilt: number;
    displacement: number;
    length: number;
    breadth: number;
    draft: number;
    carCapacity: number;
    passengerCapacity: number;
    maxPassengers: number;
    maxVehicles: number;
    maxGrossTonnage: number;
    horsepower: number;
    maxSpeed: number;
    homeTerminalId: number;
    homeTerminalName: string;
    accommodations: VesselAccommodation[];
    stats: VesselStats[];
    location: VesselLocation;
};
/**
 * Vessels cache flush date response
 */
type VesselsCacheFlushDate = {
    lastUpdated: Date;
    source: string;
};

/**
 * API function for fetching all vessels from WSF Schedule API
 */
declare const getVessels: () => Promise<Vessel[]>;
/**
 * API function for fetching vessels by route from WSF Schedule API
 */
declare const getVesselsByRoute: (routeID: number) => Promise<Vessel[]>;

/**
 * Hook for fetching all vessels from WSF Schedule API
 *
 * Retrieves vessel information for schedule-related operations.
 * This data is updated infrequently and provides static vessel
 * information used in scheduling contexts.
 *
 * @returns React Query result containing an array of Vessel objects
 */
declare const useVessels: () => _tanstack_react_query.UseQueryResult<Vessel[], Error>;
/**
 * Hook for fetching vessels by route from WSF Schedule API
 *
 * Retrieves vessel information for a specific route.
 * This data is updated infrequently and provides static vessel
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get vessels for
 * @returns React Query result containing an array of Vessel objects
 */
declare const useVesselsByRoute: (routeId: number) => _tanstack_react_query.UseQueryResult<Vessel[], Error>;

/**
 * API function for fetching all time adjustments from WSF Schedule API
 */
declare const getTimeAdjustments: () => Promise<TimeAdjustment[]>;
/**
 * API function for fetching time adjustments by route from WSF Schedule API
 */
declare const getTimeAdjustmentsByRoute: (routeID: number) => Promise<TimeAdjustment[]>;
/**
 * API function for fetching time adjustments by scheduled route from WSF Schedule API
 */
declare const getTimeAdjustmentsBySchedRoute: (schedRouteID: number) => Promise<TimeAdjustment[]>;

/**
 * Hook for fetching all time adjustments from WSF Schedule API
 *
 * Retrieves time adjustment information for schedule operations.
 * This data is updated infrequently and provides static time
 * adjustment information used in scheduling contexts.
 *
 * @returns React Query result containing an array of TimeAdjustment objects
 */
declare const useTimeAdjustments: () => _tanstack_react_query.UseQueryResult<TimeAdjustment[], Error>;
/**
 * Hook for fetching time adjustments by route from WSF Schedule API
 *
 * Retrieves time adjustment information for a specific route.
 * This data is updated infrequently and provides static time
 * adjustment information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get time adjustments for
 * @returns React Query result containing an array of TimeAdjustment objects
 */
declare const useTimeAdjustmentsByRoute: (routeId: number) => _tanstack_react_query.UseQueryResult<TimeAdjustment[], Error>;
/**
 * Hook for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Retrieves time adjustment information for a specific scheduled route.
 * This data is updated infrequently and provides static time
 * adjustment information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get time adjustments for
 * @returns React Query result containing an array of TimeAdjustment objects
 */
declare const useTimeAdjustmentsBySchedRoute: (schedRouteID: number) => _tanstack_react_query.UseQueryResult<TimeAdjustment[], Error>;

/**
 * API function for fetching valid date range from WSF API
 * This is a general infrastructure endpoint used across all WSF API operations
 */
declare const getValidDateRange: () => Promise<ValidDateRange | null>;

/**
 * Hook for fetching valid date range from WSF API
 *
 * Retrieves the valid date range for all WSF API operations.
 * This data is updated infrequently and provides static date
 * range information used to determine which dates are supported by the API.
 *
 * @returns React Query result with ValidDateRange object
 */
declare const useValidDateRange: () => _tanstack_react_query.UseQueryResult<ValidDateRange | null, Error>;

/**
 * API function for fetching cache flush date from WSF Schedule API
 *
 * Retrieves the last cache flush date for the Schedule API, which indicates
 * when the underlying data was last updated on the server. This endpoint
 * is used to determine when to invalidate cached schedule data.
 *
 * The cache flush date changes when any schedule-related data is updated,
 * including routes, schedules, terminals, vessels, time adjustments, and alerts.
 *
 * @returns Promise resolving to ScheduleCacheFlushDate object or null if fetch fails
 */
declare const getCacheFlushDateSchedule: () => Promise<ScheduleCacheFlushDate | null>;

/**
 * Hook for fetching cache flush date from WSF Schedule API with React Query
 *
 * Retrieves the last cache flush date for the Schedule API, which indicates
 * when the underlying data was last updated on the server. This hook is used
 * to determine when to invalidate cached schedule data.
 *
 * The cache flush date changes when any schedule-related data is updated,
 * including routes, schedules, terminals, vessels, time adjustments, and alerts.
 *
 * @returns React Query result with ScheduleCacheFlushDate data
 */
declare const useCacheFlushDateSchedule: () => _tanstack_react_query.UseQueryResult<ScheduleCacheFlushDate | null, Error>;

/**
 * API function for fetching cache flush date from WSF Terminals API
 *
 * Returns the date when the terminal data cache was last flushed,
 * indicating when the data was last updated.
 *
 * @returns Promise resolving to TerminalsCacheFlushDate object or null
 */
declare const getCacheFlushDateTerminals: () => Promise<TerminalsCacheFlushDate | null>;

/**
 * Hook function for fetching cache flush date from WSF Terminals API with React Query
 */
declare const useCacheFlushDateTerminals: () => _tanstack_react_query.UseQueryResult<TerminalsCacheFlushDate | null, Error>;

/**
 * API function for fetching terminal sailing space data from WSF Terminals API
 *
 * Retrieves current space availability information for all terminals including
 * vehicle capacity, wait times, and space status. This endpoint provides real-time
 * information about space availability at all WSF terminals, including current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing real-time space availability information
 */
declare const getTerminalSailingSpace: () => Promise<TerminalSailingSpace[]>;
/**
 * API function for fetching terminal sailing space data for a specific terminal from WSF Terminals API
 *
 * Retrieves current space availability information for a specific terminal identified by terminal ID,
 * including vehicle capacity, wait times, and space status. This endpoint filters the resultset
 * to a single terminal, providing real-time information about space availability, current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing real-time space availability information for the specified terminal
 */
declare const getTerminalSailingSpaceById: (terminalId: number) => Promise<TerminalSailingSpace[]>;

/**
 * Hook for fetching terminal sailing space data from WSF Terminals API
 *
 * Retrieves current space availability information for all terminals including
 * vehicle capacity, wait times, and space status. This endpoint provides real-time
 * information about space availability at all WSF terminals, including current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information
 */
declare const useTerminalSailingSpace: () => _tanstack_react_query.UseQueryResult<TerminalSailingSpace[], Error>;
/**
 * Hook for fetching terminal sailing space data for a specific terminal from WSF Terminals API
 *
 * Retrieves current space availability information for a specific terminal identified by terminal ID,
 * including vehicle capacity, wait times, and space status. This endpoint filters the resultset
 * to a single terminal, providing real-time information about space availability, current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information for the specified terminal
 */
declare const useTerminalSailingSpaceById: (terminalId: number) => _tanstack_react_query.UseQueryResult<TerminalSailingSpace[], Error>;

/**
 * API function for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including location, facilities,
 * parking information, and operational status. This endpoint provides detailed
 * information about all terminals in the WSF system, including terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @returns Promise resolving to an array of TerminalVerbose objects containing comprehensive terminal information
 */
declare const getTerminalVerbose: () => Promise<TerminalVerbose[]>;
/**
 * API function for fetching terminal verbose data for a specific terminal from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for a specific terminal identified by terminal ID,
 * including location, facilities, parking information, and operational status. This endpoint
 * filters the resultset to a single terminal, providing detailed information about terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to an array of TerminalVerbose objects containing comprehensive information for the specified terminal
 */
declare const getTerminalVerboseById: (terminalId: number) => Promise<TerminalVerbose[]>;

/**
 * Hook for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including location, facilities,
 * parking information, and operational status. This endpoint provides detailed
 * information about all terminals in the WSF system, including terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @returns React Query result containing an array of TerminalVerbose objects with comprehensive terminal information
 */
declare const useTerminalVerbose: () => _tanstack_react_query.UseQueryResult<TerminalVerbose[], Error>;
/**
 * Hook for fetching terminal verbose data for a specific terminal from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for a specific terminal identified by terminal ID,
 * including location, facilities, parking information, and operational status. This endpoint
 * filters the resultset to a single terminal, providing detailed information about terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns React Query result containing an array of TerminalVerbose objects with comprehensive information for the specified terminal
 */
declare const useTerminalVerboseById: (terminalId: number) => _tanstack_react_query.UseQueryResult<TerminalVerbose[], Error>;

/**
 * API function for fetching cache flush date from WSF Vessels API
 *
 * Returns the date when the vessel data cache was last flushed,
 * indicating when the data was last updated.
 *
 * @returns Promise resolving to VesselCacheFlushDate object or null
 */
declare const getCacheFlushDateVessels: () => Promise<VesselsCacheFlushDate | null>;

/**
 * Hook function for fetching cache flush date from WSF Vessels API with React Query
 *
 * @returns React Query result with VesselCacheFlushDate data
 */
declare const useCacheFlushDateVessels: () => _tanstack_react_query.UseQueryResult<VesselsCacheFlushDate | null, Error>;

/**
 * API function for fetching current vessel location data from WSF Vessels API
 *
 * Retrieves real-time vessel positions, speeds, headings, and status information
 * from the Washington State Ferries API. This endpoint provides current location
 * data for all active vessels in the WSF fleet, including GPS coordinates,
 * vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about vessel locations for tracking and monitoring purposes.
 *
 * @returns Promise resolving to an array of VesselLocation objects containing real-time vessel position data
 */
declare const getVesselLocations: () => Promise<VesselLocation[]>;
/**
 * API function for fetching current vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time vessel position, speed, heading, and status information
 * for a specific vessel identified by vessel ID. This endpoint filters the
 * resultset to a single vessel, providing current location data including
 * GPS coordinates, vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about the specified vessel's location for tracking and monitoring purposes.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to an array of VesselLocation objects containing real-time position data for the specified vessel
 */
declare const getVesselLocationsByVesselId: (vesselId: number) => Promise<VesselLocation[]>;

/**
 * Hook for fetching vessel location data from WSF Vessels API
 *
 * Retrieves real-time vessel positions, speeds, headings, and status information
 * from the Washington State Ferries API. This endpoint provides current location
 * data for all active vessels in the WSF fleet, including GPS coordinates,
 * vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about vessel locations for tracking and monitoring purposes.
 *
 * @returns React Query result containing an array of VesselLocation objects with real-time vessel position data
 */
declare const useVesselLocations: () => _tanstack_react_query.UseQueryResult<VesselLocation[], Error>;
/**
 * Hook for fetching vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time vessel position, speed, heading, and status information
 * for a specific vessel identified by vessel ID. This endpoint filters the
 * resultset to a single vessel, providing current location data including
 * GPS coordinates, vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about the specified vessel's location for tracking and monitoring purposes.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing an array of VesselLocation objects with real-time position data for the specified vessel
 */
declare const useVesselLocationsByVesselId: (vesselId: number) => _tanstack_react_query.UseQueryResult<VesselLocation[], Error>;

/**
 * API function for fetching vessel verbose data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information including specifications, capacity,
 * amenities, and operational status. This endpoint provides detailed information
 * about all vessels in the WSF fleet, including vessel dimensions, passenger
 * and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns Promise resolving to an array of VesselVerbose objects containing comprehensive vessel information
 */
declare const getVesselVerbose: () => Promise<VesselVerbose[]>;
/**
 * API function for fetching vessel verbose data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including specifications, capacity, amenities, and operational status. This endpoint
 * filters the resultset to a single vessel, providing detailed information about vessel
 * dimensions, passenger and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to an array of VesselVerbose objects containing comprehensive information for the specified vessel
 */
declare const getVesselVerboseById: (vesselId: number) => Promise<VesselVerbose[]>;

/**
 * Hook for fetching vessel verbose data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information including specifications, capacity,
 * amenities, and operational status. This endpoint provides detailed information
 * about all vessels in the WSF fleet, including vessel dimensions, passenger
 * and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns React Query result containing an array of VesselVerbose objects with comprehensive vessel information
 */
declare const useVesselVerbose: () => _tanstack_react_query.UseQueryResult<VesselVerbose[], Error>;
/**
 * Hook for fetching vessel verbose data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including specifications, capacity, amenities, and operational status. This endpoint
 * filters the resultset to a single vessel, providing detailed information about vessel
 * dimensions, passenger and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing an array of VesselVerbose objects with comprehensive information for the specified vessel
 */
declare const useVesselVerboseById: (vesselId: number) => _tanstack_react_query.UseQueryResult<VesselVerbose[], Error>;

/**
 * WSF Cache Provider Component
 *
 * This component monitors cache flush dates from all WSF APIs and automatically
 * invalidates related queries when the cache flush date changes, indicating
 * that the underlying data has been updated on the server.
 *
 * This component should be placed high in the component tree, ideally near
 * the root of your application, to ensure all WSF queries are properly
 * invalidated when data changes.
 */
declare const WsfCacheProvider: () => null;

/**
 * Caching configuration for frequently updated data (every few seconds to minutes)
 * Examples: Vessel locations, terminal sailing space, wait times
 */
declare const FREQUENT_UPDATE_CONFIG: {
    readonly staleTime: number;
    readonly gcTime: number;
    readonly refetchInterval: number;
    readonly refetchOnWindowFocus: true;
    readonly retry: 3;
    readonly retryDelay: (attemptIndex: number) => number;
};
/**
 * Caching configuration for infrequently updated data (daily to weekly)
 * Examples: Terminal info, vessel specs, routes, schedules, wait times
 *
 * Since this data is invalidated by cache flush dates when it changes,
 * we can cache it for much longer periods to reduce API calls and improve performance.
 */
declare const INFREQUENT_UPDATE_CONFIG: {
    readonly staleTime: number;
    readonly gcTime: number;
    readonly refetchInterval: false;
    readonly refetchOnWindowFocus: true;
    readonly retry: 5;
    readonly retryDelay: (attemptIndex: number) => number;
};
/**
 * Caching configuration for cache flush date queries
 * These are used to invalidate other queries when data changes
 */
declare const CACHE_FLUSH_CONFIG: {
    readonly staleTime: number;
    readonly gcTime: number;
    readonly refetchInterval: number;
    readonly refetchOnWindowFocus: true;
    readonly retry: 5;
    readonly retryDelay: (attemptIndex: number) => number;
};
/**
 * Helper function to create query options with frequent update configuration
 */
declare const createFrequentUpdateOptions: (additionalOptions?: {}) => {
    staleTime: number;
    gcTime: number;
    refetchInterval: number;
    refetchOnWindowFocus: true;
    retry: 3;
    retryDelay: (attemptIndex: number) => number;
};
/**
 * Helper function to create query options with infrequent update configuration
 */
declare const createInfrequentUpdateOptions: (additionalOptions?: {}) => {
    staleTime: number;
    gcTime: number;
    refetchInterval: false;
    refetchOnWindowFocus: true;
    retry: 5;
    retryDelay: (attemptIndex: number) => number;
};
/**
 * Helper function to create query options with cache flush configuration
 */
declare const createCacheFlushOptions: (additionalOptions?: {}) => {
    staleTime: number;
    gcTime: number;
    refetchInterval: number;
    refetchOnWindowFocus: true;
    retry: 5;
    retryDelay: (attemptIndex: number) => number;
};

/**
 * Hook for invalidating WSF queries based on cache flush dates
 *
 * This hook monitors cache flush dates and invalidates related queries
 * when the cache flush date changes, indicating that the underlying data
 * has been updated on the server.
 */
declare const useWsfCacheInvalidation: () => {
    invalidateVesselQueries: () => void;
    invalidateTerminalQueries: () => void;
    invalidateScheduleQueries: () => void;
    invalidateVesselQueriesByType: (type: "locations" | "verbose" | "basics") => void;
    invalidateTerminalQueriesByType: (type: "sailingSpace" | "verbose" | "basics" | "locations" | "waitTimes") => void;
    invalidateScheduleQueriesByType: (type: "routes" | "schedules" | "terminals" | "vessels" | "timeAdjustments" | "alerts") => void;
    invalidateAllWsfQueries: () => void;
};
/**
 * Hook for monitoring cache flush dates and automatically invalidating queries
 *
 * This hook should be used in a high-level component to monitor cache flush dates
 * and automatically invalidate related queries when data changes.
 */
declare const useWsfCacheFlushMonitor: () => {
    monitorVesselsCacheFlush: (lastFlushDate: Date | null, currentFlushDate: Date | null) => void;
    monitorTerminalsCacheFlush: (lastFlushDate: Date | null, currentFlushDate: Date | null) => void;
    monitorScheduleCacheFlush: (lastFlushDate: Date | null, currentFlushDate: Date | null) => void;
};

/**
 * Create a persistent QueryClient with localStorage persistence
 *
 * This QueryClient will:
 * - Persist all query cache to localStorage
 * - Restore cache on app startup
 * - Keep data for up to 7 days
 * - Provide instant data loading on app restart
 */
declare const createPersistentQueryClient: () => QueryClient;
/**
 * Hook for invalidating real-time queries on app startup
 *
 * This ensures that real-time data (vessel locations, terminal capacity)
 * gets refreshed immediately after the app starts, while infrequent data
 * (terminal info, vessel specs, schedules) stays cached until cache flush invalidation.
 */
declare const useStartupRefetch: () => void;

/**
 * Base URLs for WSF API sources
 */
declare const API_BASES: {
    readonly vessels: "https://www.wsdot.wa.gov/ferries/api/vessels/rest";
    readonly terminals: "https://www.wsdot.wa.gov/ferries/api/terminals/rest";
    readonly schedule: "https://www.wsdot.wa.gov/ferries/api/schedule/rest";
};
/**
 * API access token for WSF API authentication
 * Retrieved from environment variable EXPO_PUBLIC_WSDOT_ACCESS_TOKEN
 */
declare const API_KEY: string;
type WsfSource = "vessels" | "terminals" | "schedule";
type LoggingMode = "none" | "info" | "debug";

/**
 * Converts a JavaScript Date to WSF API date format (MM/DD/YYYY)
 */
declare const dateToWsfFormat: (date: Date) => string;
/**
 * Converts a JavaScript Date to WSF API path parameter format (YYYY-MM-DD)
 */
declare const dateToWsfPathFormat: (date: Date) => string;
/**
 * Builds a WSF API URL with parameter substitution
 *
 * @param template - URL template with placeholders like "/routes/{tripDate}/{routeId}"
 * @param params - Parameters to substitute (supports string, number, Date, and boolean values)
 * @returns The substituted URL
 */
declare const buildWsfUrl: (template: string, params?: Record<string, string | number | Date | boolean>) => string;
/**
 * Converts a JavaScript Date to WSF API time format (HH:MM AM/PM)
 */
declare const dateToWsfTimeFormat: (date: Date) => string;
/**
 * Converts a JavaScript Date to WSF API datetime format (MM/DD/YYYY HH:MM AM/PM)
 */
declare const dateToWsfDateTimeFormat: (date: Date) => string;
/**
 * Parses WSF API date format (MM/DD/YYYY) to JavaScript Date
 */
declare const parseWsfScheduleDate: (dateString: string) => Date;
/**
 * Parses WSF API time format (HH:MM AM/PM) to JavaScript Date (today's date)
 */
declare const parseWsfTime: (timeString: string) => Date;
/**
 * Parses WSF API datetime format (MM/DD/YYYY HH:MM AM/PM) to JavaScript Date
 */
declare const parseWsfDateTime: (dateTimeString: string) => Date;
/**
 * Gets today's date in WSF format
 */
declare const getTodayWsfFormat: () => string;
/**
 * Gets tomorrow's date in WSF format
 */
declare const getTomorrowWsfFormat: () => string;
/**
 * Checks if a date is today
 */
declare const isToday: (date: Date) => boolean;
/**
 * Checks if a date is tomorrow
 */
declare const isTomorrow: (date: Date) => boolean;
/**
 * Gets a human-readable date label (Today, Tomorrow, or formatted date)
 */
declare const getDateLabel: (date: Date) => string;

/**
 * Fetches data from WSF API with a complete URL
 *
 * @param source - The API source: "vessels", "terminals", or "schedule"
 * @param endpoint - The complete API endpoint path (e.g., "/vessellocations/123")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to the API response or null if fetch fails
 */
declare const fetchWsf: <T>(source: WsfSource, endpoint: string, logMode?: LoggingMode) => Promise<T | null>;
/**
 * Fetches array data from WSF API with a complete URL
 *
 * @param source - The API source: "vessels", "terminals", or "schedule"
 * @param endpoint - The complete API endpoint path (e.g., "/vessellocations")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to an array of API responses or empty array if fetch fails
 */
declare const fetchWsfArray: <T>(source: WsfSource, endpoint: string, logMode?: LoggingMode) => Promise<T[]>;

/**
 * Internal fetch function with platform-specific implementation and WSF data transformation
 */
declare const fetchInternal: <T>(url: string, endpoint: string, logMode?: LoggingMode) => Promise<T | null>;

/**
 * Type representing JSON-like data that can be transformed
 */
type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};
/**
 * Type representing transformed data (with Date objects and camelCase keys)
 */
type JsonX = string | number | boolean | null | Date | JsonX[] | {
    [key: string]: JsonX;
};
/**
 * Generic type for transformed JSON objects
 */
type TransformedJson = {
    [key: string]: JsonX;
};
/**
 * Generic type for transformed JSON arrays
 */
type TransformedJsonArray = JsonX[];
/**
 * Recursively transforms WSF API response data:
 * 1. Converts WSF date strings to JavaScript Date objects
 * 2. Converts PascalCase keys to camelCase
 * 3. Handles nested objects and arrays
 */
declare const transformWsfData: (data: JsonValue) => JsonX;

export { API_BASES, API_KEY, type ActiveSeason, type ActiveSeasonParams, type Alert, type AlertParams, CACHE_FLUSH_CONFIG, FREQUENT_UPDATE_CONFIG, INFREQUENT_UPDATE_CONFIG, type JsonValue, type JsonX, type LoggingMode, type Route, type RouteParams, type Schedule, type ScheduleCacheFlushDate, type ScheduleDeparture, type ScheduleParams, type ServiceRoute, type TerminalBasics, type TerminalBulletin, type TerminalLocation, type TerminalSailingSpace, type TerminalTransport, type TerminalVerbose, type TerminalWaitTime, type TerminalsCacheFlushDate, type TimeAdjustment, type TimeAdjustmentParams, type TransformedJson, type TransformedJsonArray, type ValidDateRange, type Vessel, type VesselAccommodation, type VesselLocation, type VesselStats, type VesselVerbose, type VesselsCacheFlushDate, WsfCacheProvider, type WsfSource, buildWsfUrl, createCacheFlushOptions, createFrequentUpdateOptions, createInfrequentUpdateOptions, createPersistentQueryClient, dateToWsfDateTimeFormat, dateToWsfFormat, dateToWsfPathFormat, dateToWsfTimeFormat, fetchInternal, fetchWsf, fetchWsfArray, getActiveSeasons, getAlerts, getAllSailings, getCacheFlushDateSchedule, getCacheFlushDateTerminals, getCacheFlushDateVessels, getDateLabel, getRouteDetails, getRouteDetailsByRoute, getRouteDetailsByTerminals, getRoutes, getRoutesByTerminals, getRoutesWithDisruptions, getSailings, getScheduleByRoute, getScheduleByTerminals, getScheduleTodayByRoute, getScheduleTodayByTerminals, getScheduledRoutes, getScheduledRoutesBySeason, getTerminalMates, getTerminalSailingSpace, getTerminalSailingSpaceById, getTerminalVerbose, getTerminalVerboseById, getTerminals, getTerminalsAndMates, getTerminalsByRoute, getTimeAdjustments, getTimeAdjustmentsByRoute, getTimeAdjustmentsBySchedRoute, getTodayWsfFormat, getTomorrowWsfFormat, getValidDateRange, getVesselLocations, getVesselLocationsByVesselId, getVesselVerbose, getVesselVerboseById, getVessels, getVesselsByRoute, isToday, isTomorrow, parseWsfDateTime, parseWsfScheduleDate, parseWsfTime, transformWsfData, useActiveSeasons, useAlerts, useAllSailings, useCacheFlushDateSchedule, useCacheFlushDateTerminals, useCacheFlushDateVessels, useRouteDetails, useRouteDetailsByRoute, useRouteDetailsByTerminals, useRoutes, useRoutesByTerminals, useRoutesWithDisruptions, useSailings, useScheduleByRoute, useScheduleByTerminals, useScheduleTodayByRoute, useScheduleTodayByTerminals, useScheduledRoutes, useScheduledRoutesBySeason, useStartupRefetch, useTerminalMates, useTerminalSailingSpace, useTerminalSailingSpaceById, useTerminalVerbose, useTerminalVerboseById, useTerminals, useTerminalsAndMates, useTerminalsByRoute, useTimeAdjustments, useTimeAdjustmentsByRoute, useTimeAdjustmentsBySchedRoute, useValidDateRange, useVesselLocations, useVesselLocationsByVesselId, useVesselVerbose, useVesselVerboseById, useVessels, useVesselsByRoute, useWsfCacheFlushMonitor, useWsfCacheInvalidation };
