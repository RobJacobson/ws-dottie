import { z } from "zod";

/**
 * TravelRestriction schema
 *
 * A travel restriction for mountain passes.
 */
export const travelRestrictionSchema = z
  .object({
    /** The text of this restriction. */
    RestrictionText: z.string().describe("The text of this restriction."),
    /** The direction of this restriction. */
    TravelDirection: z.string().describe("The direction of this restriction."),
  })
  .describe("A travel restriction for mountain passes.");

/** TravelRestriction type */
export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;
