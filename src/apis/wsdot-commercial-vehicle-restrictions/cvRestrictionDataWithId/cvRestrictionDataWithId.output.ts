import { z } from "zod";
import { cVRestrictionDataSchema } from "../cvRestrictionData/cvRestrictionData.output";

/**
 * Schema for CVRestrictionDataWithId - extends CVRestrictionData with a unique identifier
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const cVRestrictionDataWithIdSchema = cVRestrictionDataSchema
  .extend({
    /** Unique identifier for the restriction. */
    UniqueID: z
      .string()
      .nullable()
      .describe("Unique identifier for the restriction."),
  })
  .describe(
    "Provides list of restrictions for commercial vehicles. Coverage Area: Statewide."
  );

export type CVRestrictionDataWithId = z.infer<
  typeof cVRestrictionDataWithIdSchema
>;
