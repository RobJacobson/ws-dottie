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
    Geometry: z
      .string()
      .nullable()
      .describe(
        "Geometric shape data for toll trip route, as a geometry string. E.g., empty string when geometry data is not available, null when geometry is unavailable. Typically contains encoded route geometry for mapping and visualization. Used for displaying trip routes on maps."
      ),
    ModifiedDate: zDotnetDate().describe(
      "Timestamp when toll trip information was last modified, as a UTC datetime. E.g., '2025-10-21T05:00:00.000Z' for modification on October 20, 2025 at 10:00 PM. Indicates when trip route information was updated or changed."
    ),
  })
  .describe(
    "Represents toll trip information including trip route details, location coordinates, geometry data, and modification timestamp. E.g., trip 'Tmptp02565' from I-405 milepost 25.65 to SR 516 milepost 21.94 with geometry data modified October 20, 2025. Used for toll trip route discovery, trip information lookups, and route mapping. Provides reference information for toll trip routes."
  );

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;
