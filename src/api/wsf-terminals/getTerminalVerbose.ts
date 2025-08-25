import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";
import { terminalBulletinItemSchema } from "./getTerminalBulletinsByTerminalId";

// ============================================================================
// API Function
//
// getTerminalVerbose
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalverbose";

/**
 * API function for fetching terminal verbose from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for all terminals including
 * all details about facilities, services, transportation options, and current status.
 * This endpoint provides the most complete information available for each terminal.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalVerbose objects containing comprehensive terminal information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getTerminalVerbose({});
 * console.log(terminals[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalVerbose = async (
  params: GetTerminalVerboseParams = {}
): Promise<TerminalVerbose[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalVerboseParamsSchema,
      output: terminalVerboseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalVerboseParamsSchema
// GetTerminalVerboseParams
// ============================================================================

export const getTerminalVerboseParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all terminal verbose information."
  );

export type GetTerminalVerboseParams = z.infer<
  typeof getTerminalVerboseParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalTransitLinkSchema
// terminalWaitTimeSchema
// terminalVerboseSchema
// terminalVerboseArraySchema
// TerminalVerbose
// TerminalTransitLink
// TerminalWaitTime
// TerminalBulletinItem (imported from ./getTerminalBulletinsByTerminalId)
// ============================================================================

export const terminalTransitLinkSchema = z
  .object({
    LinkName: z
      .string()
      .describe(
        "Name of the transit link. Provides a descriptive title for the transportation option."
      ),
    LinkURL: z
      .string()
      .describe(
        "URL for the transit link. Provides direct access to information about the transportation option."
      ),
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "Sort sequence for the transit link. Used to determine the display order of multiple transit options."
      ),
  })
  .describe(
    "Transit link information providing access to transportation options. Contains links to bus, train, and other transit services."
  );

export const terminalWaitTimeSchema = z
  .object({
    RouteID: z
      .number()
      .int()
      .nullable()
      .describe(
        "Unique identifier for the route. Used to identify specific ferry routes in the WSF system."
      ),
    RouteName: z
      .string()
      .nullable()
      .describe(
        "Name of the route. Provides the human-readable name for the ferry route."
      ),
    WaitTimeIVRNotes: z
      .string()
      .nullable()
      .describe(
        "Interactive Voice Response notes for wait times. Contains automated phone system information about current wait times."
      ),
    WaitTimeLastUpdated: zWsdotDate().describe(
      "Timestamp when the wait time information was last updated. Indicates the freshness of the wait time data."
    ),
    WaitTimeNotes: z
      .string()
      .nullable()
      .describe(
        "Additional notes about wait times. Contains supplementary information about current wait time conditions."
      ),
  })
  .describe(
    "Wait time information for a specific route at a terminal. Contains current wait times and related notes for passengers."
  );

export const terminalVerboseSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    AddressLineOne: z
      .string()
      .describe(
        "Primary address line for the terminal. Contains the street address and building information."
      ),
    AddressLineTwo: z
      .string()
      .nullable()
      .describe(
        "Secondary address line for the terminal. Contains additional address information such as suite numbers or building details."
      ),
    City: z
      .string()
      .describe(
        "City where the terminal is located. Provides the municipality or city name for the terminal address."
      ),
    State: z
      .string()
      .describe(
        "State where the terminal is located. Provides the state or province name for the terminal address."
      ),
    ZipCode: z
      .string()
      .describe(
        "ZIP or postal code for the terminal address. Used for mail delivery and geographic identification."
      ),
    Country: z
      .string()
      .describe(
        "Country where the terminal is located. Provides the country name for the terminal address."
      ),
    Latitude: z
      .number()
      .describe(
        "Geographic latitude coordinate of the terminal. Used for mapping and location services."
      ),
    Longitude: z
      .number()
      .describe(
        "Geographic longitude coordinate of the terminal. Used for mapping and location services."
      ),
    Directions: z
      .string()
      .nullable()
      .describe(
        "Text directions to the terminal. Provides step-by-step instructions for reaching the terminal by various transportation methods."
      ),
    DispGISZoomLoc: z
      .array(
        z
          .object({
            Latitude: z
              .number()
              .describe(
                "Latitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            Longitude: z
              .number()
              .describe(
                "Longitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            ZoomLevel: z
              .number()
              .int()
              .min(0)
              .describe(
                "Recommended zoom level for displaying this location on a map. Ensures optimal visibility of the terminal."
              ),
          })
          .describe(
            "GIS display location with recommended zoom level. Used for mapping applications to show terminal locations optimally."
          )
      )
      .describe(
        "Array of GIS display locations for the terminal. Contains coordinates and zoom levels for optimal map display."
      ),
    MapLink: z
      .string()
      .nullable()
      .describe(
        "URL link to an online map showing the terminal location. Provides direct access to mapping services for the terminal."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Indicates whether the terminal has elevator access. True if passengers with mobility needs can access the terminal via elevator."
      ),
    WaitingRoom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has a waiting room. True if passengers can wait indoors before boarding."
      ),
    FoodService: z
      .boolean()
      .describe(
        "Indicates whether the terminal offers food service. True if food and beverages are available for purchase."
      ),
    Restroom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has restroom facilities. True if public restrooms are available for passengers."
      ),
    OverheadPassengerLoading: z
      .boolean()
      .describe(
        "Indicates whether the terminal supports overhead passenger loading. True if passengers can board from an elevated platform."
      ),
    IsNoFareCollected: z
      .boolean()
      .nullable()
      .describe(
        "Indicates whether fares are collected at this terminal. True if no fare collection occurs at this location."
      ),
    NoFareCollectedMsg: z
      .string()
      .nullable()
      .describe(
        "Message explaining why no fare is collected. Provides information about fare collection policies at this terminal."
      ),
    AdaInfo: z
      .string()
      .nullable()
      .describe(
        "Americans with Disabilities Act information. Contains details about accessibility features and accommodations."
      ),
    AdditionalInfo: z
      .string()
      .nullable()
      .describe(
        "Additional information about the terminal. Contains miscellaneous details and special instructions for passengers."
      ),
    AirportInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport connections. Contains details about airport shuttle services and transportation options."
      ),
    AirportShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport shuttle services. Contains details about shuttle schedules and routes to airports."
      ),
    BikeInfo: z
      .string()
      .nullable()
      .describe(
        "Information about bicycle access and parking. Contains details about bike racks and bicycle-friendly facilities."
      ),
    ChamberOfCommerce: terminalTransitLinkSchema
      .nullable()
      .describe(
        "Chamber of Commerce information and contact details. Provides local business and tourism information."
      ),
    ConstructionInfo: z
      .string()
      .nullable()
      .describe(
        "Information about construction activities at the terminal. Contains details about ongoing work and potential impacts."
      ),
    FacInfo: z
      .string()
      .nullable()
      .describe(
        "Facility information. Contains details about terminal facilities and amenities."
      ),
    FareDiscountInfo: z
      .string()
      .nullable()
      .describe(
        "Information about fare discounts and special rates. Contains details about reduced fares and eligibility requirements."
      ),
    FoodServiceInfo: z
      .string()
      .nullable()
      .describe(
        "Detailed information about food service options. Contains details about restaurants, cafes, and dining facilities."
      ),
    HovInfo: z
      .string()
      .nullable()
      .describe(
        "Information about High Occupancy Vehicle (HOV) access. Contains details about HOV lanes and carpooling options."
      ),
    LostAndFoundInfo: z
      .string()
      .nullable()
      .describe(
        "Information about lost and found services. Contains details about how to report lost items and retrieve found items."
      ),
    MotorcycleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about motorcycle access and parking. Contains details about motorcycle-specific facilities and policies."
      ),
    ParkingInfo: z
      .string()
      .nullable()
      .describe(
        "Information about parking facilities at the terminal. Contains details about parking availability, rates, and restrictions."
      ),
    ParkingShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about parking shuttle services. Contains details about shuttle schedules and routes to parking areas."
      ),
    REALTIME_SHUTOFF_FLAG: z
      .boolean()
      .describe(
        "Flag indicating whether real-time information is available. True if real-time data is being provided for this terminal."
      ),
    REALTIME_SHUTOFF_MESSAGE: z
      .string()
      .nullable()
      .describe(
        "Message explaining real-time information status. Contains details about why real-time data may not be available."
      ),
    RealtimeIntroMsg: z
      .string()
      .nullable()
      .describe(
        "Introduction message for real-time information. Contains welcome text and instructions for using real-time data."
      ),
    ResourceStatus: z
      .string()
      .nullable()
      .describe(
        "Current status of terminal resources. Contains information about facility availability and operational status."
      ),
    SecurityInfo: z
      .string()
      .nullable()
      .describe(
        "Information about security measures and procedures. Contains details about security policies and safety information."
      ),
    TallySystemInfo: z
      .string()
      .nullable()
      .describe(
        "Information about the tally system. Contains details about how vehicle counts are managed and displayed."
      ),
    TaxiInfo: z
      .string()
      .nullable()
      .describe(
        "Information about taxi services. Contains details about taxi availability and pickup locations."
      ),
    TrainInfo: z
      .string()
      .nullable()
      .describe(
        "Information about train connections. Contains details about nearby train stations and rail services."
      ),
    TruckInfo: z
      .string()
      .nullable()
      .describe(
        "Information about truck access and parking. Contains details about truck-specific facilities and policies."
      ),
    TypeDesc: z
      .string()
      .nullable()
      .describe(
        "Type description for the terminal. Contains classification information about the terminal's role and function."
      ),
    VisitorLinks: z
      .array(z.any())
      .nullable()
      .describe(
        "Array of visitor information links. Contains links to tourism, attractions, and local information."
      ),
    Bulletins: z
      .array(terminalBulletinItemSchema)
      .describe(
        "Array of bulletins and announcements for this terminal. Contains important information, alerts, and notices for passengers."
      ),
    TransitLinks: z
      .array(terminalTransitLinkSchema)
      .describe(
        "Array of transit links providing access to various transportation options. Contains links to bus, train, and other transit services."
      ),
    WaitTimes: z
      .array(terminalWaitTimeSchema)
      .describe(
        "Array of wait time information for all routes at this terminal. Contains current wait times for each route serving this terminal."
      ),
  })
  .describe(
    "Complete verbose terminal information including all details about facilities, services, transportation options, and current status. Provides comprehensive information for passengers and planning purposes."
  );

export const terminalVerboseArraySchema = z
  .array(terminalVerboseSchema)
  .describe(
    "Array of verbose terminal information. Contains comprehensive details about facilities, services, and current status for multiple terminals."
  );

export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;
// TerminalBulletinItem type exported from ./getTerminalBulletins
export type TerminalTransitLink = z.infer<typeof terminalTransitLinkSchema>;
export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminalVerbose
// ============================================================================

/**
 * React Query hook for fetching all terminal verbose
 *
 * Retrieves all terminal verbose from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalVerbose objects
 */
export const useTerminalVerbose = (
  options?: TanStackOptions<TerminalVerbose[]>
): UseQueryResult<TerminalVerbose[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "verbose"],
    queryFn: getTerminalVerbose,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
