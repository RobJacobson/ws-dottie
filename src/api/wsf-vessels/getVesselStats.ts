import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zNullableNumber, zNullableString } from "@/shared/validation";

// Import vessel class schema from getVesselBasics
import { vesselClassSchema } from "./getVesselBasics";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselstats";

/**
 * API function for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information for all vessels in the WSF fleet,
 * including operational statistics, performance metrics, and other relevant data.
 * This endpoint provides comprehensive statistical information about vessel operations.
 *
 * @returns Promise resolving to an array of VesselStats objects containing vessel statistics
 *
 * @example
 * ```typescript
 * const stats = await getVesselStats();
 * console.log(stats[0].VesselName); // "M/V Cathlamet"
 * console.log(stats[0].MaxPassengerCount); // 2000
 * ```
 */
export const getVesselStats = async (): Promise<VesselStats[]> => {
  return zodFetch(ENDPOINT, {
    output: vesselStatsArraySchema,
  });
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

// This endpoint has no parameters, so no input schema is needed

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const vesselStatsSchema = z
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
        "Full official vessel name as used by Washington State Ferries, including the 'M/V' prefix. Examples include 'M/V Cathlamet', 'M/V Spokane', 'M/V Walla Walla'. This is the complete name displayed on schedules and used by passengers and crew."
      ),
    VesselAbbrev: z
      .string()
      .describe(
        "Abbreviated vessel name used for display in limited space contexts such as mobile apps, departure boards, and compact schedules. Typically 3-8 characters long and derived from the full vessel name."
      ),
    Class: vesselClassSchema.describe(
      "Detailed vessel class information including class identifiers, name, and associated images. This object provides comprehensive classification data that categorizes the vessel by its type and specifications."
    ),
    VesselNameDesc: z
      .string()
      .describe(
        "Descriptive name or title for the vessel that provides additional context or historical significance. This field may include honorary names, commemorative titles, or descriptive information about the vessel's purpose or characteristics."
      ),
    VesselHistory: zNullableString().describe(
      "Historical information about the vessel including its construction, service history, notable events, or other historical details. May be null if no historical information is available. This field provides context about the vessel's past and significance."
    ),
    Beam: z
      .string()
      .describe(
        "Vessel beam measurement indicating the maximum width of the vessel at its widest point. This measurement is typically expressed in feet and is critical for determining vessel compatibility with ferry terminals and navigation channels."
      ),
    CityBuilt: z
      .string()
      .describe(
        "City where the vessel was originally constructed or built. This field provides information about the vessel's origin and may include the shipyard or construction facility location. Examples include 'Seattle', 'Tacoma', 'Vancouver', or 'San Francisco'."
      ),
    SpeedInKnots: z
      .number()
      .describe(
        "Maximum operating speed of the vessel in nautical knots. This field indicates the vessel's top speed under normal operating conditions and is used for route planning, scheduling, and performance calculations. One knot equals approximately 1.15 miles per hour."
      ),
    Draft: z
      .string()
      .describe(
        "Vessel draft measurement indicating the depth of the vessel below the waterline. This measurement is typically expressed in feet and is critical for determining safe navigation in shallow waters and compatibility with ferry terminal depths."
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
    Length: z
      .string()
      .describe(
        "Overall length of the vessel from bow to stern. This measurement is typically expressed in feet and is critical for determining vessel compatibility with ferry terminals, berth requirements, and navigation considerations."
      ),
    MaxPassengerCount: z
      .number()
      .describe(
        "Maximum passenger capacity under normal operating conditions. This field indicates the total number of passengers the vessel can safely accommodate and is used for capacity planning, safety compliance, and operational scheduling."
      ),
    PassengerOnly: z
      .boolean()
      .describe(
        "Indicates whether this is a passenger-only vessel that does not carry vehicles. True means the vessel is designed exclusively for passenger transport, False means the vessel can accommodate both passengers and vehicles."
      ),
    FastFerry: z
      .boolean()
      .describe(
        "Indicates whether this vessel is classified as a fast ferry with higher operating speeds. True means the vessel operates at higher speeds than traditional ferries, False means it operates at standard ferry speeds."
      ),
    PropulsionInfo: z
      .string()
      .describe(
        "Detailed information about the vessel's propulsion system including engine types, fuel systems, transmission details, and other propulsion-related specifications. This field provides technical details for engineering and maintenance purposes."
      ),
    TallDeckClearance: z
      .number()
      .describe(
        "Clearance height for tall vehicles in feet, measured from the deck surface to overhead structures. This field is critical for determining which vehicles can safely use the vessel and for route planning with height restrictions."
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
    Displacement: z
      .number()
      .describe(
        "Vessel displacement in tons, representing the weight of water displaced by the vessel when floating. This measurement is used for stability calculations, regulatory compliance, and engineering specifications."
      ),
    YearBuilt: z
      .number()
      .describe(
        "Year the vessel was originally constructed and launched. This field provides historical context about the vessel's age and may be used for maintenance planning, regulatory compliance, and fleet management decisions."
      ),
    YearRebuilt: zNullableNumber().describe(
      "Year the vessel was rebuilt or refurbished, if applicable. May be null if no major reconstruction has occurred. This field indicates when significant upgrades or modifications were completed and is used for maintenance history tracking."
    ),
    VesselDrawingImg: zNullableString().describe(
      "URL or file path to the vessel's technical drawing image, if available. May be null if no technical drawing is accessible. This field provides access to detailed schematics and engineering drawings for technical reference."
    ),
    SolasCertified: z
      .boolean()
      .describe(
        "Indicates whether the vessel is SOLAS (Safety of Life at Sea) certified, which is an international maritime safety standard. True means the vessel meets international safety requirements, False means it operates under domestic safety standards only."
      ),
    MaxPassengerCountForInternational: zNullableNumber().describe(
      "Maximum passenger capacity for international routes, if applicable. May be null if the vessel does not operate on international routes. This field indicates the passenger limit when operating between different countries and may differ from domestic capacity limits."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Comprehensive technical statistics and specifications for a vessel including dimensions, capacity, propulsion, and certification details. This schema represents detailed vessel data from the WSF Vessels API, providing essential information for vessel operations, maintenance planning, and technical specifications."
  );

export const vesselStatsArraySchema = z
  .array(vesselStatsSchema)
  .describe("Array of technical statistics for all vessels in the WSF fleet");

export type VesselStats = z.infer<typeof vesselStatsSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information for all vessels in the WSF fleet,
 * including operational statistics, performance metrics, and other relevant data.
 * This endpoint provides comprehensive statistical information about vessel operations.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselStats objects with statistical information for all vessels
 */
export const useVesselStats = (
  options?: TanStackOptions<VesselStats[]>
): UseQueryResult<VesselStats[], Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "stats"],
    queryFn: () => getVesselStats(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
