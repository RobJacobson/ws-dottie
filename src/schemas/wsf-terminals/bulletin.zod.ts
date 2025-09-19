import { z } from "zod";

import { zWsdotDate } from "@/shared/tanstack";

/**
 * Bulletin schema for WSF Terminals API
 *
 * Represents a single bulletin/alert associated with a terminal.
 */
export const bulletinSchema = z.object({
  /** The title of the bulletin. */
  BulletinTitle: z.string().nullable().describe("The title of the bulletin."),

  /** The content of the bulletin. */
  BulletinText: z.string().nullable().describe("The content of the bulletin."),

  /** A preferred sort order (sort-ascending with respect to other bulletins in this array). */
  BulletinSortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other bulletins in this array)."
    ),

  /** The date that this bulletin was last updated. */
  BulletinLastUpdated: zWsdotDate()
    .nullable()
    .describe("The date that this bulletin was last updated."),

  /** Legacy string representation of BulletinLastUpdated. */
  BulletinLastUpdatedSortable: z
    .string()
    .nullable()
    .describe("Legacy string representation of BulletinLastUpdated."),
});

export type Bulletin = z.infer<typeof bulletinSchema>;
