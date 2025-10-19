import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { tollTripBaseSchema } from "../shared/tollTripBaseSchema";

/**
 * Schema for toll trip information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripInfoSchema = tollTripBaseSchema
  .extend({
    /** Geometry information for the trip. */
    Geometry: z
      .string()
      .nullable()
      .describe("Geometry information for the trip."),
    /** Date when the trip information was last modified. */
    ModifiedDate: zDotnetDate().describe(
      "Date when the trip information was last modified."
    ),
  })
  .describe("Schema for toll trip information");

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;
