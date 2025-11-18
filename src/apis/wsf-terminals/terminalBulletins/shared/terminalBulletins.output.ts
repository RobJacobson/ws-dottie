/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";
import { terminalBaseSchema } from "../../shared/terminalBaseSchema";

/**
 * Bulletin schema
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const bulletinSchema = z
  .object({
    BulletinTitle: z.string().nullable().describe("Title of the bulletin."),
    BulletinText: z
      .string()
      .nullable()
      .describe("HTML-formatted content of the bulletin."),
    BulletinSortSeq: z
      .number()
      .int()
      .describe(
        "Display sort order for the bulletin; lower values appear first."
      ),
    BulletinLastUpdated: zDotnetDate()
      .nullable()
      .describe("UTC datetime when the bulletin was last updated."),
    BulletinLastUpdatedSortable: z
      .string()
      .nullable()
      .describe(
        "Legacy sortable string representation of the bulletin update date."
      ),
  })
  .describe(
    "Bulletin information including title, HTML content, sort order, and update date."
  );

export type Bulletin = z.infer<typeof bulletinSchema>;

/**
 * TerminalBulletin schema
 *
 * Contains terminal information with associated bulletins.
 */
export const terminalBulletinSchema = terminalBaseSchema
  .extend({
    Bulletins: z
      .array(bulletinSchema)
      .describe("Array of bulletins and alerts associated with the terminal."),
  })
  .describe("Terminal information with associated bulletins and alerts.");

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;

/**
 * GetAllTerminalBulletins schema
 *
 * Returns all terminal bulletins.
 */
export const getAllTerminalBulletinsSchema = z
  .array(terminalBulletinSchema)
  .describe("Array of terminal information with bulletins for all terminals.");

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
