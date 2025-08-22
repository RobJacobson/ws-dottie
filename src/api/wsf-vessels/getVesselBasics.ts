import { z } from "zod";

import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

const zDate = () => zWsdotDate();

export const vesselClassSchema = z
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
  .catchall(z.unknown())
  .describe(
    "Vessel class information including class identifiers, name, and associated images. Used to categorize vessels by their type and specifications."
  );

export const vesselBasicSchema = z
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
    Class: vesselClassSchema.describe(
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
  })
  .catchall(z.unknown())
  .describe(
    "Basic vessel information including vessel names, abbreviations, class information, and operational status. This provides fundamental vessel details for all vessels in the WSF fleet."
  );

export const vesselBasicArraySchema = z
  .array(vesselBasicSchema)
  .describe(
    "Array of basic vessel information for all vessels in the Washington State Ferries fleet. Each entry contains fundamental vessel details including names, abbreviations, class information, and operational status."
  );

export type VesselBasic = z.infer<typeof vesselBasicSchema>;
export type VesselClass = z.infer<typeof vesselClassSchema>;

// ============================================================================
// API FUNCTION
// ============================================================================

const WSF_VESSELS_BASE = "/ferries/api/vessels/rest";

/**
 * API function for fetching vessel basics from WSF Vessels API
 *
 * Retrieves basic vessel information including vessel names, abbreviations,
 * class information, and operational status. This endpoint provides fundamental
 * vessel details for all vessels in the WSF fleet.
 *
 * @returns Promise resolving to an array of VesselBasic objects containing basic vessel information
 *
 * @example
 * ```typescript
 * const vessels = await getVesselBasics();
 * console.log(vessels[0].VesselName); // "Cathlamet"
 * ```
 */
export const getVesselBasics = async (): Promise<VesselBasic[]> => {
  return zodFetch(`${WSF_VESSELS_BASE}/vesselbasics`, {
    output: vesselBasicArraySchema,
  });
};
