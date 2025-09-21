import { z } from "zod";

/**
 * Transit link schema for WSF Terminals API
 *
 * Represents a link to a transit agency that services a terminal.
 */
export const transitLinkSchema = z.object({
  /** The URL of the transit link. */
  LinkURL: z.string().nullable().describe("The URL of the transit link."),

  /** The name of the transit agency. */
  LinkName: z.string().nullable().describe("The name of the transit agency."),

  /** A preferred sort order (sort-ascending with respect to other transit links in this array). */
  SortSeq: z
    .number()
    .int()
    .nullable()
    .describe(
      "A preferred sort order (sort-ascending with respect to other transit links in this array)."
    ),
});

export type TransitLink = z.infer<typeof transitLinkSchema>;
