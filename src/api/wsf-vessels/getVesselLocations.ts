import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// API FUNCTION
// ============================================================================

const WSF_VESSELS_BASE = "/ferries/api/vessels/rest";

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
 *
 * @example
 * ```typescript
 * const locations = await getVesselLocations();
 * console.log(locations[0].VesselName); // "M/V Cathlamet"
 * ```
 */
export const getVesselLocations = async (): Promise<VesselLocation[]> => {
  return zodFetch(`${WSF_VESSELS_BASE}/vessellocations`, {
    output: vesselLocationArraySchema,
  });
};

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

const zDate = () => zWsdotDate();

export const vesselLocationSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique vessel identifier assigned by Washington State Ferries. Each vessel in the WSF fleet has a permanent ID number used consistently across all API endpoints. For example, vessel ID 1 always corresponds to M/V Cathlamet. This ID can be used to correlate vessel data across different API calls like schedules, accommodations, and statistics."
      ),
    VesselName: z
      .string()
      .min(1)
      .describe(
        "Full official vessel name as used by Washington State Ferries. Examples include 'Cathlamet', 'Spokane', 'Walla Walla'. This is the name displayed on schedules and used by passengers and crew to identify vessels."
      ),
    Mmsi: z
      .number()
      .describe(
        "Maritime Mobile Service Identity (MMSI) number for the vessel, which is a unique 9-digit identifier used in maritime communications and tracking systems. This number is assigned by the International Telecommunication Union and is used for vessel identification in maritime safety and communication systems."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal the vessel is departing from. This ID corresponds to the terminal where the vessel began its current journey and can be used to correlate with terminal information from other WSF APIs."
      ),
    DepartingTerminalName: z
      .string()
      .describe(
        "Full name of the terminal the vessel is departing from. Examples include 'Anacortes', 'Friday Harbor', 'Seattle', or 'Bainbridge Island'. This field provides the human-readable departure location for passenger information and route tracking."
      ),
    DepartingTerminalAbbrev: z
      .string()
      .describe(
        "Abbreviated name of the departing terminal used for display in space-constrained interfaces. Examples include 'ANA' for Anacortes, 'FRI' for Friday Harbor, 'SEA' for Seattle, or 'BI' for Bainbridge Island."
      ),
    ArrivingTerminalID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for the terminal the vessel is arriving at. May be null if the vessel is not currently en route to a specific destination or if the arrival terminal is not yet determined."
      ),
    ArrivingTerminalName: z
      .string()
      .nullable()
      .describe(
        "Full name of the terminal the vessel is arriving at. Examples include 'Anacortes', 'Friday Harbor', 'Seattle', or 'Bainbridge Island'. May be null if the vessel is not currently en route to a specific destination."
      ),
    ArrivingTerminalAbbrev: z
      .string()
      .nullable()
      .describe(
        "Abbreviated name of the arriving terminal used for display in space-constrained interfaces. Examples include 'ANA' for Anacortes, 'FRI' for Friday Harbor, 'SEA' for Seattle, or 'BI' for Bainbridge Island. May be null if the vessel is not currently en route to a specific destination."
      ),
    Latitude: z
      .number()
      .min(-90)
      .max(90)
      .describe(
        "Current vessel latitude position in decimal degrees using the WGS84 coordinate system. Range is -90 to 90 degrees, where positive values are North and negative values are South. Puget Sound area typically ranges from approximately 47.0 to 48.8 degrees North. Updated in near real-time from vessel GPS systems."
      ),
    Longitude: z
      .number()
      .min(-180)
      .max(180)
      .describe(
        "Current vessel longitude position in decimal degrees using the WGS84 coordinate system. Range is -180 to 180 degrees, where negative values are West of the Prime Meridian. Puget Sound area typically ranges from approximately -123.3 to -122.2 degrees West. Updated in near real-time from vessel GPS systems."
      ),
    Speed: z
      .number()
      .min(0)
      .describe(
        "Current vessel speed over ground in nautical knots (1 knot = 1.15078 mph). Typical ferry speeds range from 0 knots when docked to about 18-20 knots during transit. A speed of 0 usually indicates the vessel is docked, while speeds above 15 knots typically indicate active transit between terminals."
      ),
    Heading: z
      .number()
      .min(0)
      .max(359)
      .describe(
        "Current vessel heading (direction of travel) in degrees from true North. 0 degrees is North, 90 degrees is East, 180 degrees is South, 270 degrees is West. This indicates the direction the vessel's bow is pointing, which may differ from the actual direction of travel due to currents and wind."
      ),
    InService: z
      .boolean()
      .describe(
        "Indicates whether the vessel is currently in active passenger service and following its scheduled route. True means the vessel is operating normally and available for passenger/vehicle transport. False may indicate the vessel is out of service for maintenance, emergency, or other operational reasons."
      ),
    AtDock: z
      .boolean()
      .describe(
        "Indicates whether the vessel is currently docked at a terminal and likely loading/unloading passengers and vehicles. True means the vessel is at a dock, False means it's in transit or anchored. This is useful for determining if passengers can currently board the vessel."
      ),
    LeftDock: zDate()
      .nullable()
      .describe(
        "Timestamp indicating when the vessel left the dock to begin its journey. May be null if the vessel has not yet departed or if departure time information is not available. This field is used for tracking vessel movement and calculating transit times."
      ),
    Eta: zDate()
      .nullable()
      .describe(
        "Estimated time of arrival at the destination terminal. May be null if the vessel is not currently en route to a specific destination or if arrival time cannot be estimated. This field helps passengers plan their arrival at the terminal."
      ),
    EtaBasis: z
      .string()
      .nullable()
      .describe(
        "Basis for the estimated time of arrival calculation. May be null if no ETA basis information is available. This field explains how the arrival time was calculated, such as 'GPS tracking', 'Schedule', or 'Operator estimate'."
      ),
    ScheduledDeparture: zDate()
      .nullable()
      .describe(
        "Scheduled departure time from the origin terminal according to the published ferry schedule. May be null if the vessel is not following a scheduled route or if schedule information is not available. This field helps passengers plan their arrival at the terminal."
      ),
    ManagedBy: z
      .number()
      .nullable()
      .describe(
        "Entity identifier managing the vessel operation. May be null if management information is not available. This field indicates which organization or department is responsible for the vessel's current operations."
      ),
    OpRouteAbbrev: z
      .array(z.string())
      .nullable()
      .describe(
        "Array of operating route abbreviations for the vessel's current journey. May be null if route information is not available. This field provides information about which ferry routes the vessel is currently serving."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sort sequence number used to determine the display order of vessels in listings and applications. Lower numbers typically appear first, helping organize vessels in a logical sequence for user interfaces."
      ),
    TimeStamp: zDate().describe(
      "Timestamp indicating when this location and status data was last updated by the WSF tracking system. Data is typically updated every 30 seconds to 2 minutes. All times are in Pacific Time Zone (PT/PDT). Use this to determine how current the vessel position data is."
    ),
    VesselPositionNum: z
      .number()
      .nullable()
      .describe(
        "Position number indicating the vessel's current position in the fleet or route sequence. May be null if position numbering is not applicable or not available. This field helps track vessel order in multi-vessel operations."
      ),
    VesselWatchMsg: z
      .string()
      .nullable()
      .describe(
        "Vessel watch message providing operational status or alert information. May be null if no watch message is currently active. This field contains important operational information that operators and passengers should be aware of."
      ),
    VesselWatchShutFlag: z
      .string()
      .describe(
        "Flag indicating whether vessel watch systems are currently shut down or disabled. This field provides information about the operational status of vessel monitoring and safety systems."
      ),
    VesselWatchShutID: z
      .number()
      .nullable()
      .describe(
        "Identifier for the vessel watch shutdown event. May be null if no shutdown is currently active. This field helps track and reference specific shutdown events for operational and maintenance purposes."
      ),
    VesselWatchShutMsg: z
      .string()
      .nullable()
      .describe(
        "Message explaining the reason for vessel watch system shutdown. May be null if no shutdown message is available. This field provides context about why monitoring systems may be temporarily disabled."
      ),
    VesselWatchStatus: z
      .string()
      .describe(
        "Current status code for the vessel watch monitoring system. This field indicates the operational state of vessel tracking and monitoring systems, such as 'Active', 'Maintenance', or 'Disabled'."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Real-time vessel location, speed, heading, and operational status from the Washington State Ferries vessel tracking system. This data is updated approximately every 30 seconds to 2 minutes and provides the most current information about where ferries are located and their operational status. Essential for passenger apps, logistics planning, and real-time ferry tracking applications."
  );

export const vesselLocationArraySchema = z
  .array(vesselLocationSchema)
  .describe(
    "Array of real-time vessel locations for all active vessels in the Washington State Ferries fleet. Each entry contains current position, speed, heading, and operational status data updated approximately every 30 seconds to 2 minutes."
  );

export type VesselLocation = z.infer<typeof vesselLocationSchema>;

// ============================================================================
// VESSEL LOCATIONS HOOKS
// Real-time GPS tracking and vessel positioning
// ============================================================================

/**
 * Hook for fetching vessel location data from WSF Vessels API
 *
 * Retrieves real-time vessel positions, speeds, headings, and status information
 * from the Washington State Ferries API. This endpoint provides current location
 * data for all active vessels in the WSF fleet, including GPS coordinates,
 * vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about vessel locations for tracking and monitoring purposes. This hook uses
 * real-time caching configuration with 5-second refresh intervals.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselLocation objects with real-time location data for all vessels
 *
 * @example
 * ```typescript
 * const { data: locations } = useVesselLocations();
 * console.log(locations?.[0]?.VesselName); // "M/V Cathlamet"
 * ```
 */
export const useVesselLocations = (
  options?: TanStackOptions<VesselLocation[]>
): UseQueryResult<VesselLocation[], Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "locations"],
    queryFn: () => getVesselLocations(),
    ...tanstackQueryOptions.REALTIME_UPDATES,
    ...options,
  });
};
