import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zNullableString, zPositiveInteger } from "@/shared/validation";
import { createVesselIdDescription } from "@/shared/validation/templates";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
// Import vessel class schema from getVesselBasicsById
import { vesselClassSchema } from "./getVesselBasicsById";

// ============================================================================
// API Function
//
// getVesselAccommodationsById
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";

/**
 * API function for fetching vessel accommodation data for a specific vessel from WSF Vessels API
 *
 * Retrieves detailed accommodation information for a specific vessel identified by vessel ID,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @returns Promise resolving to a VesselAccommodation object containing accommodation information
 *
 * @example
 * ```typescript
 * const accommodation = await getVesselAccommodationsById({ vesselId: 1 });
 * console.log(accommodation.VesselName); // "Cathlamet"
 * console.log(accommodation.ADAAccessible); // true
 * ```
 */
export const getVesselAccommodationsById = async (
  params: GetVesselAccommodationsByIdParams
): Promise<VesselAccommodation> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getVesselAccommodationsByIdParamsSchema,
      output: vesselAccommodationSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsByIdParamsSchema
// GetVesselAccommodationsByIdParams
// ============================================================================

export const getVesselAccommodationsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose accommodation details you want to retrieve. This returns information about passenger capacity, vehicle capacity, ADA accessibility, amenities like restrooms and Wi-Fi, and other accommodation features"
      )
    ),
  })
  .describe(
    "Parameters for retrieving detailed accommodation information for a specific vessel"
  );

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationSchema
// VesselAccommodation
// ============================================================================

export const vesselAccommodationSchema = z
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
        "Full official vessel name as used by Washington State Ferries. Examples include 'Cathlamet', 'Spokane', 'Walla Walla'. This is the complete name displayed on schedules and used by passengers and crew."
      ),
    VesselAbbrev: z
      .string()
      .describe(
        "Abbreviated vessel name used for display in limited space contexts such as mobile apps, departure boards, and compact schedules. Typically 3-8 characters long and derived from the full vessel name."
      ),
    Class: vesselClassSchema.describe(
      "Detailed vessel class information including class identifiers, name, and associated images. This object provides comprehensive classification data that categorizes the vessel by its type and specifications."
    ),
    CarDeckRestroom: z
      .boolean()
      .describe(
        "Indicates whether restroom facilities are available on the car deck for drivers and passengers who remain with their vehicles. True means restrooms are accessible on the vehicle deck, False means passengers must go to the main cabin for restroom access."
      ),
    CarDeckShelter: z
      .boolean()
      .describe(
        "Indicates whether covered shelter is available on the car deck to protect passengers from weather conditions. True means there is a sheltered area on the vehicle deck, False means passengers are exposed to the elements."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Indicates whether elevator access is available between different decks of the vessel. True means passengers with mobility needs can move between decks via elevator, False means only stairs are available for deck access."
      ),
    ADAAccessible: z
      .boolean()
      .describe(
        "Indicates whether the vessel meets Americans with Disabilities Act (ADA) accessibility requirements. True means the vessel is fully accessible to passengers with disabilities, False means there may be accessibility limitations."
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
    AdditionalInfo: zNullableString().describe(
      "Additional accommodation information that may not fit into other structured fields. May be null if no additional information is available. This field provides supplementary details about vessel amenities and services."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Detailed accommodation information for a vessel including passenger amenities, accessibility features, and facility availability. This schema represents comprehensive accommodation data from the WSF Vessels API, providing essential information for passenger planning, accessibility needs, and vessel facility assessment."
  );

export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;

// ============================================================================
// TanStack Query Hook
//
// useVesselAccommodationsById
// ============================================================================

/**
 * Hook for fetching vessel accommodations for a specific vessel from WSF Vessels API
 *
 * Retrieves detailed accommodation information for a specific vessel identified by vessel ID,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselAccommodation object with accommodation information
 *
 * @example
 * ```typescript
 * const { data: accommodation } = useVesselAccommodationsById({ vesselId: 1 });
 * console.log(accommodation?.VesselName); // "Cathlamet"
 * ```
 */
export const useVesselAccommodationsById = (
  params: { vesselId: number },
  options?: TanStackOptions<VesselAccommodation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations", JSON.stringify(params)],
    queryFn: () => getVesselAccommodationsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
