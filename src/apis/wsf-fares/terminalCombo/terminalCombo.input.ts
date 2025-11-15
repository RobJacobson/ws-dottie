/**
 * @fileoverview Input schemas for WSF Fares API TerminalCombo endpoints
 *
 * These schemas define the input parameters for WSF Fares API TerminalCombo endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod";

export const terminalComboInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range."
      ),
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
  })
  .describe(
    "Input parameters for retrieving fare collection description for a terminal combination."
  );

export type TerminalComboInput = z.infer<typeof terminalComboInputSchema>;

export const terminalComboFaresVerboseInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range."
      ),
  })
  .describe(
    "Input parameters for retrieving fare collection descriptions for all terminal combinations."
  );

export type TerminalComboFaresVerboseInput = z.infer<
  typeof terminalComboFaresVerboseInputSchema
>;
