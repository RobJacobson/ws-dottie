/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod-openapi-init";
import { zDotnetDate } from "@/apis/shared";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * Bulletin schema
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const bulletinSchema = z
  .object({
    BulletinTitle: z
      .string()
      .nullable()
      .describe(
        "Title of bulletin, as a bulletin title. E.g., 'Vehicle reservations for the winter season opened Oct 28 at 10am' for reservation bulletin, null when title is unavailable. Provides bulletin identification for display."
      ),
    BulletinText: z
      .string()
      .nullable()
      .describe(
        "Content of bulletin, as HTML-formatted bulletin text. E.g., '<p><a href=\"...\">Vehicle reservations</a> for the winter 2025 schedule...</p>' for reservation details, null when content is unavailable. HTML-formatted text for bulletin display."
      ),
    BulletinSortSeq: z
      .number()
      .int()
      .describe(
        "Preferred sort order for bulletin display, as an integer. E.g., '4' for fourth bulletin priority. Lower values appear first when sorting bulletins in ascending order. Used for bulletin display ordering."
      ),
    BulletinLastUpdated: zDotnetDate()
      .nullable()
      .describe(
        "Date when bulletin was last updated, as a UTC datetime. E.g., '2025-10-30T22:28:21.497Z' for bulletin updated at 10:28 PM on October 30, 2025, null when update date is unavailable. Indicates when bulletin information was last modified."
      ),
    BulletinLastUpdatedSortable: z
      .string()
      .nullable()
      .describe(
        "Legacy string representation of bulletin last updated date, as a sortable date string. E.g., '20251030152821' for October 30, 2025 at 15:28:21, null when sortable date is unavailable. Used for legacy sorting systems."
      ),
  })
  .describe(
    "Represents bulletin information including title, HTML-formatted content, sort order, update date, and legacy sortable date string. E.g., bulletin 'Vehicle reservations for the winter season opened Oct 28 at 10am' (sort 4, updated October 30, 2025). Used for bulletin display and alert notifications."
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
      .describe(
        "Array of bulletins and alerts associated with terminal, as bulletin objects. E.g., array containing reservation bulletin, empty array when terminal has no bulletins. Used for displaying terminal alerts and bulletins."
      ),
  })
  .describe(
    "Represents terminal information with associated bulletins including terminal identification, region, and bulletin list. E.g., Anacortes terminal (ID 1) with reservation bulletin. Used for terminal alert and bulletin display."
  );

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;

/**
 * GetAllTerminalBulletins schema
 *
 * Returns all terminal bulletins.
 */
export const getAllTerminalBulletinsSchema = z
  .array(terminalBulletinSchema)
  .describe(
    "Array of terminal information with associated bulletins including terminal IDs, names, and bulletin lists. E.g., array containing all terminals with their bulletins. Used for terminal alert and bulletin monitoring."
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
