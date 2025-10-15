import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { vesselBaseSchema, vesselClassSchema } from "../shared/vesselBase";

/**
 * VesselAccommodations schema
 *
 * This operation retrieves details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselAccommodationsSchema = vesselBaseSchema
  .extend({
    /**
     * Indicates whether or not the vessel has an ADA restroom on the car deck.
     */
    CarDeckRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA restroom on the car deck."
      ),
    /**
     * Indicates whether or not the vessel has an ADA shelter on the car deck.
     */
    CarDeckShelter: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has an ADA shelter on the car deck."
      ),
    /**
     * Indicates whether or not the vessel has an elevator.
     */
    Elevator: z
      .boolean()
      .describe("Indicates whether or not the vessel has an elevator."),
    /**
     * Indicates whether or not the vessel is ADA accessible.
     */
    ADAAccessible: z
      .boolean()
      .describe("Indicates whether or not the vessel is ADA accessible."),
    /**
     * Indicates whether or not the vessel has a galley in the main cabin.
     */
    MainCabinGalley: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a galley in the main cabin."
      ),
    /**
     * Indicates whether or not the vessel has a restroom in the main cabin.
     */
    MainCabinRestroom: z
      .boolean()
      .describe(
        "Indicates whether or not the vessel has a restroom in the main cabin."
      ),
    /**
     * Indicates whether or not Wifi is available on the vessel.
     */
    PublicWifi: z
      .boolean()
      .describe("Indicates whether or not Wifi is available on the vessel."),
    /**
     * Additional ADA notes concerning this vessel.
     */
    ADAInfo: z
      .string()
      .nullable()
      .describe("Additional ADA notes concerning this vessel."),
    /**
     * Additional miscellaneous notes concerning this vessel.
     */
    AdditionalInfo: z
      .string()
      .nullable()
      .describe("Additional miscellaneous notes concerning this vessel."),
  })
  .describe(
    "Provides details regarding vessel accommodations (bathrooms, galley, elevator, etc)."
  );

export type VesselAccommodations = z.infer<typeof vesselAccommodationsSchema>;
