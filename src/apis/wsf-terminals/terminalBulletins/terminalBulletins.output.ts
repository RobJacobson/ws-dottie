/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * Bulletin schema
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const bulletinSchema = z.object({
  /** The title of the bulletin. */
  BulletinTitle: z.string().nullable().describe("The title of the bulletin."),
  /** The content of the bulletin. */
  BulletinText: z.string().nullable().describe("The content of the bulletin."),
  /**
   * A preferred sort order (sort-ascending with respect to other bulletins in this list).
   */
  BulletinSortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other bulletins in this list)."
    ),
  /** The date that this bulletin was last updated. */
  BulletinLastUpdated: zDotnetDate()
    .nullable()
    .describe("The date that this bulletin was last updated."),
  /**
   * Legacy string representation of BulletinLastUpdated.
   */
  BulletinLastUpdatedSortable: z
    .string()
    .nullable()
    .describe("Legacy string representation of BulletinLastUpdated."),
});

export type Bulletin = z.infer<typeof bulletinSchema>;

/**
 * TerminalBulletin schema
 *
 * Contains terminal information with associated bulletins.
 */
export const terminalBulletinSchema = terminalBaseSchema.extend({
  /**
   * The bulletins / alerts associated with this terminal.
   */
  Bulletins: z
    .array(bulletinSchema)
    .describe("The bulletins / alerts associated with this terminal."),
});

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;

/**
 * GetAllTerminalBulletins schema
 *
 * Returns all terminal bulletins.
 */
export const getAllTerminalBulletinsSchema = z
  .array(terminalBulletinSchema)
  .describe(
    "This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalBulletins = z.infer<
  typeof getAllTerminalBulletinsSchema
>;

/**
 * GetSpecificTerminalBulletin schema
 *
 * Returns bulletins for a specific terminal.
 */
export const getSpecificTerminalBulletinSchema = terminalBulletinSchema;

export type GetSpecificTerminalBulletin = z.infer<
  typeof getSpecificTerminalBulletinSchema
>;
