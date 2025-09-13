import { z } from "zod";
import { vesselClassSchema } from "./class.zod";
import { vesselSchema } from "./vessel.zod";

/**
 * Vessel accommodations schema for WSF Vessels API
 *
 * This operation provides details regarding vessel accommodations (bathrooms, galley,
 * elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed
 * to retrieve a specific vessel. A valid API Access Code from the WSDOT Traveler API
 * must be passed as part of the URL string.
 */
export const vesselAccommodationsSchema = vesselSchema.extend({
  /** Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel. */
  Class: vesselClassSchema
    .nullable()
    .describe(
      "Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel."
    ),

  /** Indicates whether or not the vessel has an ADA restroom on the car deck. */
  CarDeckRestroom: z
    .boolean()
    .describe(
      "Indicates whether or not the vessel has an ADA restroom on the car deck."
    ),

  /** Indicates whether or not the vessel has an ADA shelter on the car deck. */
  CarDeckShelter: z
    .boolean()
    .describe(
      "Indicates whether or not the vessel has an ADA shelter on the car deck."
    ),

  /** Indicates whether or not the vessel has an elevator. */
  Elevator: z
    .boolean()
    .describe("Indicates whether or not the vessel has an elevator."),

  /** Indicates whether or not the vessel is ADA accessible. */
  ADAAccessible: z
    .boolean()
    .describe("Indicates whether or not the vessel is ADA accessible."),

  /** Indicates whether or not the vessel has a galley in the main cabin. */
  MainCabinGalley: z
    .boolean()
    .describe(
      "Indicates whether or not the vessel has a galley in the main cabin."
    ),

  /** Indicates whether or not the vessel has a restroom in the main cabin. */
  MainCabinRestroom: z
    .boolean()
    .describe(
      "Indicates whether or not the vessel has a restroom in the main cabin."
    ),

  /** Indicates whether or not Wifi is available on the vessel. */
  PublicWifi: z
    .boolean()
    .describe("Indicates whether or not Wifi is available on the vessel."),

  /** Additional ADA notes concerning this vessel. */
  ADAInfo: z
    .string()
    .nullable()
    .describe("Additional ADA notes concerning this vessel."),

  /** Additional miscellaneous notes concerning this vessel. */
  AdditionalInfo: z
    .string()
    .nullable()
    .describe("Additional miscellaneous notes concerning this vessel."),
});

export type VesselAccommodations = z.infer<typeof vesselAccommodationsSchema>;

/**
 * Array of vessel accommodations.
 */
export const vesselAccommodationssSchema = z
  .array(vesselAccommodationsSchema)
  .describe("The accommodation details for vessels in the WSF fleet.");

export type VesselAccommodationss = z.infer<typeof vesselAccommodationssSchema>;
