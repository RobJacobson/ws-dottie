import { z } from "@/shared/zod";
import { tollTripBaseSchema } from "../../shared/tollTripBaseSchema";

/**
 * Schema for toll trip information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripInfoSchema = tollTripBaseSchema
  .extend({
    Geometry: z
      .string()
      .nullable()
      .describe(
        "Encoded route geometry data for mapping. Empty string or null when geometry is unavailable."
      ),
    ModifiedDate: z.date().describe(
      "UTC datetime when trip route information was last modified."
    ),
  })
  .describe(
    "Trip route information for a single toll trip, including locations, coordinates, and optional geometry."
  );

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;
