import { z } from "zod";
import { cVRestrictionDataSchema } from "../cvRestrictionData/cvRestrictionData.output";

/**
 * Schema for CVRestrictionDataWithId - extends CVRestrictionData with a unique identifier
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const cVRestrictionDataWithIdSchema = cVRestrictionDataSchema
  .extend({
    UniqueID: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for commercial vehicle restriction, as a restriction ID. E.g., 'B-WA-010-1' for bridge restriction on SR-10, 'R-WA-010-1' for road restriction on SR-10, 'B-WA-101-40' for bridge restriction on US-101, null when unique ID is unavailable. Format: [Type]-[State]-[Route]-[Sequence]. Used for restriction tracking and ID-based lookups."
      ),
  })
  .describe(
    "Represents commercial vehicle restriction information with unique identifier, including weight limits by classification, height/width/length restrictions, location data, effective dates, restriction type, and unique restriction ID. E.g., Teanaway River bridge restriction (ID: B-WA-010-1) on SR-10 with 20,000 lb axle limits. Used for commercial vehicle route planning, compliance checking, and restriction tracking with ID-based operations. Covers bridge and roadway restrictions statewide."
  );

export type CVRestrictionDataWithId = z.infer<
  typeof cVRestrictionDataWithIdSchema
>;
