/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod-openapi-init";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * TerminalBasicDetail schema
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicSchema = terminalBaseSchema
  .extend({
    OverheadPassengerLoading: z
      .boolean()
      .describe(
        "Indicator whether overhead passenger loading facility is available, as a boolean. E.g., true for terminals with overhead walkway/ramp for passenger boarding, false for terminals without overhead loading. Used to determine passenger boarding method and accessibility."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Indicator whether terminal has elevator access, as a boolean. E.g., false for terminals without elevators, true for terminals with elevator access. Used to determine accessibility for passengers with mobility needs."
      ),
    WaitingRoom: z
      .boolean()
      .describe(
        "Indicator whether terminal has waiting room facility, as a boolean. E.g., true for terminals with indoor waiting areas, false for terminals without waiting rooms. Used to determine passenger comfort amenities."
      ),
    FoodService: z
      .boolean()
      .describe(
        "Indicator whether terminal offers food service, as a boolean. E.g., true for terminals with cafés or food vendors, false for terminals without food service. Used to determine passenger amenities."
      ),
    Restroom: z
      .boolean()
      .describe(
        "Indicator whether terminal has restroom facilities, as a boolean. E.g., true for terminals with restrooms, false for terminals without restrooms. Used to determine passenger amenities."
      ),
  })
  .describe(
    "Represents basic terminal information including terminal identification, region, amenities (overhead passenger loading, elevator, waiting room, food service, restrooms), and sort order. E.g., Anacortes terminal (ID 1) with overhead loading, waiting room, food service, and restrooms. Used for terminal discovery, terminal identification, and amenity display."
  );

export type TerminalBasic = z.infer<typeof terminalBasicSchema>;

/**
 * GetAllTerminalBasicDetails schema
 *
 * Returns all terminal basic details.
 */
export const getAllTerminalBasicSchema = z
  .array(terminalBasicSchema)
  .describe(
    "Array of basic terminal information including terminal IDs, names, abbreviations, amenities, and sort order. E.g., array containing all terminals with their basic information. Used for terminal discovery and terminal list display."
  );

export type GetAllTerminalBasic = z.infer<typeof getAllTerminalBasicSchema>;

/**
 * GetSpecificTerminalBasicDetail schema
 *
 * Returns basic details for a specific terminal.
 */
export const getSpecificTerminalBasicSchema = terminalBasicSchema;

export type GetSpecificTerminalBasic = z.infer<
  typeof getSpecificTerminalBasicSchema
>;
