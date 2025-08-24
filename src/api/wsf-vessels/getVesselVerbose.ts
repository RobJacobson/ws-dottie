import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";

// ============================================================================
// API Function
//
// getVesselVerbose
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselverbose";

/**
 * Get comprehensive vessel information for all vessels from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for all vessels in the WSF fleet,
 * including detailed specifications, operational data, and extended information.
 * This endpoint provides the most complete vessel information available.
 *
 * @returns Promise resolving to an array of VesselVerbose objects containing comprehensive vessel information
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const vessels = await getVesselVerbose();
 * console.log(vessels[0].VesselName); // "Cathlamet"
 * console.log(vessels[0].MaxPassengerCount); // 1000
 * ```
 */
export const getVesselVerbose = async (): Promise<VesselVerbose[]> => {
  return zodFetch(ENDPOINT, {
    output: vesselVerboseArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselVerboseParamsSchema
// GetVesselVerboseParams
// ============================================================================

// No input parameters for this endpoint

// ============================================================================
// Output Schema & Types
//
// vesselVerboseSchema
// VesselVerbose
// ============================================================================

export const vesselVerboseSchema = z
  .object({
    VesselID: z
      .number()
      .describe(
        "Unique identifier assigned to this vessel by the WSF system. This ID serves as a permanent, unique reference for the vessel across all WSF systems and can be used for tracking, reporting, and data correlation purposes."
      ),
    VesselSubjectID: z
      .number()
      .describe(
        "Subject identifier for the vessel used for grouping related vessel information and maintaining data relationships within the WSF system. This field helps organize vessels by their subject matter or category."
      ),
    VesselName: z
      .string()
      .describe(
        "Full official vessel name as used by Washington State Ferries. Examples include 'Cathlamet', 'Spokane', 'Walla Walla'. This is the name displayed on schedules and used by passengers and crew to identify vessels."
      ),
    VesselAbbrev: z
      .string()
      .describe(
        "Abbreviated vessel name used for display in limited space contexts such as mobile apps, departure boards, and compact schedules. Typically 3-8 characters long and derived from the full vessel name."
      ),
    Class: z
      .object({
        ClassID: z
          .number()
          .describe(
            "Unique identifier assigned to this vessel class by the WSF system. This ID serves as a permanent, unique reference for the vessel class across all WSF systems and can be used for tracking, reporting, and data correlation purposes."
          ),
        ClassSubjectID: z
          .number()
          .describe(
            "Subject identifier for the vessel class used for grouping related class information and maintaining data relationships within the WSF system. This field helps organize vessel classes by their subject matter or category."
          ),
        ClassName: z
          .string()
          .describe(
            "Official name of the vessel class as designated by Washington State Ferries. Examples include 'Jumbo Mark II', 'Issaquah Class', 'Olympic Class', or 'Super Class'. This field provides the primary classification name for vessels of this type."
          ),
        SortSeq: z
          .number()
          .describe(
            "Sort sequence number used to determine the display order of vessel classes in listings and applications. Lower numbers typically appear first, helping organize vessel classes in a logical sequence for user interfaces."
          ),
        DrawingImg: z
          .string()
          .describe(
            "URL or file path to the technical drawing image for this vessel class. This field provides access to detailed technical schematics and engineering drawings that show the vessel's design and specifications."
          ),
        SilhouetteImg: z
          .string()
          .describe(
            "URL or file path to the silhouette image for this vessel class. This field provides access to profile or outline images that help users visually identify vessels of this class type."
          ),
        PublicDisplayName: z
          .string()
          .describe(
            "Public-facing display name for the vessel class that is suitable for passenger information systems. This field provides a user-friendly name that can be displayed on schedules, signs, and passenger communications."
          ),
      })
      .describe(
        "Detailed vessel class information including class identifiers, name, and associated images. This object provides comprehensive classification data that categorizes the vessel by its type and specifications."
      ),
    Status: z
      .number()
      .describe(
        "Operational status code for the vessel indicating its current operational state. This numeric code represents various vessel conditions such as active service, maintenance, out of service, or other operational statuses."
      ),
    OwnedByWSF: z
      .boolean()
      .describe(
        "Indicates whether the vessel is owned by Washington State Ferries. True means the vessel is owned and operated by WSF, False means the vessel is leased, chartered, or operated under contract by another entity."
      ),
    YearBuilt: z
      .number()
      .describe(
        "Year the vessel was originally constructed and launched. This field provides historical context about the vessel's age and may be used for maintenance planning, regulatory compliance, and fleet management decisions."
      ),
    Displacement: z
      .number()
      .describe(
        "Vessel displacement in tons, representing the weight of water displaced by the vessel when floating. This measurement is used for stability calculations, regulatory compliance, and engineering specifications."
      ),
    Length: z
      .string()
      .describe(
        "Overall length of the vessel from bow to stern. This measurement is typically expressed in feet and is critical for determining vessel compatibility with ferry terminals, berth requirements, and navigation considerations."
      ),
    Beam: z
      .string()
      .describe(
        "Vessel beam measurement indicating the maximum width of the vessel at its widest point. This measurement is typically expressed in feet and is critical for determining vessel compatibility with ferry terminals and navigation channels."
      ),
    Draft: z
      .string()
      .describe(
        "Vessel draft measurement indicating the depth of the vessel below the waterline. This measurement is typically expressed in feet and is critical for determining safe navigation in shallow waters and compatibility with ferry terminal depths."
      ),
    SpeedInKnots: z
      .number()
      .describe(
        "Maximum operating speed of the vessel in nautical knots. This field indicates the vessel's top speed under normal operating conditions and is used for route planning, scheduling, and performance calculations. One knot equals approximately 1.15 miles per hour."
      ),
    EngineCount: z
      .number()
      .describe(
        "Number of engines installed on the vessel for propulsion and power generation. This field indicates the vessel's engine configuration and redundancy, which affects reliability, maintenance requirements, and operational flexibility."
      ),
    Horsepower: z
      .number()
      .describe(
        "Total combined horsepower of all engines installed on the vessel. This field indicates the vessel's total power output and is used for performance calculations, fuel consumption estimates, and operational planning."
      ),
    MaxPassengerCount: z
      .number()
      .describe(
        "Maximum passenger capacity under normal operating conditions. This field indicates the total number of passengers the vessel can safely accommodate and is used for capacity planning, safety compliance, and operational scheduling."
      ),
    RegDeckSpace: z
      .number()
      .describe(
        "Regular deck space available for standard vehicles, typically measured in vehicle units or square feet. This field indicates the capacity for normal-sized vehicles and is used for capacity planning and scheduling."
      ),
    TallDeckSpace: z
      .number()
      .describe(
        "Tall deck space available for oversized vehicles that require additional height clearance, typically measured in vehicle units or square feet. This field indicates the capacity for vehicles that exceed standard height limits."
      ),
    Tonnage: z
      .number()
      .describe(
        "Vessel tonnage measurement indicating the vessel's size and carrying capacity. This measurement is typically expressed in gross tons and is used for regulatory compliance, port fees, and operational classification."
      ),
    PropulsionInfo: z
      .string()
      .describe(
        "Detailed information about the vessel's propulsion system including engine types, fuel systems, transmission details, and other propulsion-related specifications. This field provides technical details for engineering and maintenance purposes."
      ),
    ADAAccessible: z
      .boolean()
      .describe(
        "Indicates whether the vessel meets Americans with Disabilities Act (ADA) accessibility requirements. True means the vessel is fully accessible to passengers with disabilities, False means there may be accessibility limitations."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Indicates whether elevator access is available between different decks of the vessel. True means passengers with mobility needs can move between decks via elevator, False means only stairs are available for deck access."
      ),
    CarDeckRestroom: z
      .boolean()
      .describe(
        "Indicates whether restroom facilities are available on the car deck for drivers and passengers who remain with their vehicles. True means restrooms are accessible on the vehicle deck, False means passengers must go to the main cabin for restroom access."
      ),
    MainCabinGalley: z
      .boolean()
      .describe(
        "Indicates whether food service or galley facilities are available in the main passenger cabin. True means food and beverages can be purchased on board, False means no food service is available during the crossing."
      ),
    MainCabinRestroom: z
      .boolean()
      .describe(
        "Indicates whether restroom facilities are available in the main passenger cabin. True means passengers have access to restrooms in the main cabin area, False means restrooms are only available in other locations."
      ),
    PublicWifi: z
      .boolean()
      .describe(
        "Indicates whether public Wi-Fi internet access is available on the vessel. True means passengers can connect to the internet during the crossing, False means no internet access is provided on board."
      ),
    ADAInfo: z
      .string()
      .describe(
        "Detailed information about ADA accessibility features and accommodations available on the vessel. This field provides comprehensive details about accessibility services, equipment, and facilities for passengers with disabilities."
      ),
    VesselNameDesc: z
      .string()
      .describe(
        "Descriptive name or title for the vessel that provides additional context or historical significance. This field may include honorary names, commemorative titles, or descriptive information about the vessel's purpose or characteristics."
      ),
    VesselHistory: z
      .string()
      .nullable()
      .describe(
        "Historical information about the vessel including its construction, service history, notable events, or other historical details. May be null if no historical information is available. This field provides context about the vessel's past and significance."
      ),
    CityBuilt: z
      .string()
      .describe(
        "City where the vessel was originally constructed or built. This field provides information about the vessel's origin and may include the shipyard or construction facility location. Examples include 'Seattle', 'Tacoma', 'Vancouver', or 'San Francisco'."
      ),
    YearRebuilt: z
      .number()
      .nullable()
      .describe(
        "Year the vessel was rebuilt or refurbished, if applicable. May be null if no major reconstruction has occurred. This field indicates when significant upgrades or modifications were completed and is used for maintenance history tracking."
      ),
    CarDeckShelter: z
      .boolean()
      .describe(
        "Indicates whether covered shelter is available on the car deck to protect passengers from weather conditions. True means there is a sheltered area on the vehicle deck, False means passengers are exposed to the elements."
      ),
    AdditionalInfo: z
      .string()
      .nullable()
      .describe(
        "Additional information about the vessel that may not fit into other structured fields. May be null if no additional information is available. This field provides supplementary details about vessel features, history, or special characteristics."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Comprehensive vessel information combining basic details, technical specifications, accommodation features, and historical data. This schema represents the most complete vessel dataset available from the WSF Vessels API, providing all information about a vessel in a single response for comprehensive vessel analysis and passenger information."
  );

export const vesselVerboseArraySchema = z
  .array(vesselVerboseSchema)
  .describe(
    "Array of comprehensive vessel information for all vessels in the WSF fleet"
  );

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useVesselVerbose
// ============================================================================

/**
 * Hook for fetching verbose vessel data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for all vessels in the WSF fleet,
 * including detailed specifications, operational data, and extended information.
 * This endpoint provides the most complete vessel information available.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselVerbose objects with comprehensive information for all vessels
 */
export const useVesselVerbose = (
  options?: TanStackOptions<VesselVerbose[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "verbose"],
    queryFn: getVesselVerbose,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
