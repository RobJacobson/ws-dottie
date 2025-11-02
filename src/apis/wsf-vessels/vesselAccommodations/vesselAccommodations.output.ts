import { z } from "zod";
import { vesselBaseSchema } from "../shared/vesselBase";

/**
 * VesselAccommodations schema
 *
 * This operation retrieves details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselAccommodationsSchema = vesselBaseSchema
  .extend({
    CarDeckRestroom: z
      .boolean()
      .describe(
        "ADA-accessible restroom availability on car deck, as a boolean. E.g., true for vessels like Chimacum and Cathlamet, false for vessels like Chetzemoka. Used to inform passengers with accessibility needs about restroom facilities without leaving the vehicle deck."
      ),
    CarDeckShelter: z
      .boolean()
      .describe(
        "ADA-accessible shelter availability on car deck, as a boolean. E.g., true for Olympic-class vessels like Chimacum, false for most Issaquah-class vessels. Provides covered waiting area for passengers remaining on vehicle deck during crossing."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Elevator availability for passenger deck access, as a boolean. E.g., true for vessels like Chimacum, Cathlamet, and Chetzemoka, false when elevator is unavailable. Enables accessibility between car deck and passenger deck levels."
      ),
    ADAAccessible: z
      .boolean()
      .describe(
        "Overall ADA accessibility indicator, as a boolean. E.g., true for vessels with comprehensive accessibility features like Chimacum, false when vessel lacks required accessibility accommodations. Indicates vessel meets Americans with Disabilities Act accessibility standards."
      ),
    MainCabinGalley: z
      .boolean()
      .describe(
        "Food service galley availability in main passenger cabin, as a boolean. E.g., true for vessels like Chimacum and Cathlamet, false when galley is unavailable. Indicates food and beverage service availability during crossing."
      ),
    MainCabinRestroom: z
      .boolean()
      .describe(
        "Restroom availability in main passenger cabin, as a boolean. E.g., true for all vessels in sample data, false when restroom is unavailable. Indicates restroom facilities accessible from main passenger deck."
      ),
    PublicWifi: z
      .boolean()
      .describe(
        "Public WiFi availability on vessel, as a boolean. E.g., false for all vessels in sample data, true when WiFi service is available. Indicates internet connectivity for passengers during crossing."
      ),
    ADAInfo: z
      .string()
      .nullable()
      .describe(
        "Detailed ADA accessibility information, as a human-readable description. E.g., 'The M/V Chimacum has two ADA compliant elevators...' for comprehensive accessibility details, null when ADA information is unavailable. Provides detailed accessibility guidance for passengers with disabilities."
      ),
    AdditionalInfo: z
      .string()
      .nullable()
      .describe(
        "Additional miscellaneous vessel accommodation notes, as a human-readable description. E.g., empty string ' ' when no additional notes, null when additional information is unavailable. Contains supplementary accommodation details not covered by standard boolean flags."
      ),
  })
  .describe(
    "Represents vessel accommodation information including amenities, accessibility features, and passenger facilities. E.g., vessel Chimacum with elevator, ADA accessible restrooms on car deck and main cabin, galley, and detailed ADA information. Used for passenger information displays, accessibility planning, and determining vessel amenities. Extends vesselBaseSchema with accommodation and accessibility fields."
  );

export type VesselAccommodations = z.infer<typeof vesselAccommodationsSchema>;
