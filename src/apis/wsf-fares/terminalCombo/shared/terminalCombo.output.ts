/**
 * @fileoverview Output schemas for WSF Fares API TerminalCombo endpoints
 *
 * These schemas define the response structures for WSF Fares API TerminalCombo endpoints.
 */

import { z } from "@/shared/zod";

export const terminalComboFaresSchema = z
  .object({
    DepartingDescription: z
      .string()
      .nullable()
      .describe(
        "Display name of the departing terminal, or null if unavailable."
      ),
    ArrivingDescription: z
      .string()
      .nullable()
      .describe(
        "Display name of the arriving terminal, or null if unavailable."
      ),
    CollectionDescription: z
      .string()
      .nullable()
      .describe(
        "Text description of fare collection procedures for this terminal combination, or null if unavailable."
      ),
  })
  .describe(
    "Fare collection description for a terminal combination with terminal names and collection procedures."
  );

export type TerminalComboFares = z.infer<typeof terminalComboFaresSchema>;

export const terminalComboFaresVerboseSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    DepartingDescription: z
      .string()
      .nullable()
      .describe(
        "Display name of the departing terminal, or null if unavailable."
      ),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
    ArrivingDescription: z
      .string()
      .nullable()
      .describe(
        "Display name of the arriving terminal, or null if unavailable."
      ),
    CollectionDescription: z
      .string()
      .nullable()
      .describe(
        "Text description of fare collection procedures for this terminal combination, or null if unavailable."
      ),
  })
  .describe(
    "Fare collection description for a terminal combination with IDs, names, and collection procedures."
  );

export type TerminalComboFaresVerbose = z.infer<
  typeof terminalComboFaresVerboseSchema
>;
