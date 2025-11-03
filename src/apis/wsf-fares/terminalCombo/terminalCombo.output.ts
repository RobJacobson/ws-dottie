/**
 * @fileoverview Output schemas for WSF Fares API TerminalCombo endpoints
 *
 * These schemas define the response structures for WSF Fares API TerminalCombo endpoints.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Terminal combo response schema for GetTerminalComboDetail endpoint
 *
 * This operation describes what fares are collected for a given departing terminal, arriving terminal and trip date. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalComboResponseSchema = z
  .object({
    DepartingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of departing terminal, as a terminal name. E.g., 'Anacortes' for terminal 1, 'Bainbridge Island' for terminal 3, null when departing terminal name is unavailable. Provides origin terminal identification for fare collection description."
      ),
    ArrivingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of arriving terminal, as a terminal name. E.g., 'Friday Harbor' for terminal 10, 'Lopez Island' for terminal 13, 'Orcas Island' for terminal 15, null when arriving terminal name is unavailable. Provides destination terminal identification for fare collection description."
      ),
    CollectionDescription: z
      .string()
      .nullable()
      .describe(
        "Text description of fare collection procedures for terminal combination, as a collection description. E.g., 'Passenger and vehicle/driver fares are collected at Anacortes, while no fares are collected at Friday Harbor' for Anacortes-Friday Harbor route, null when collection description is unavailable. Explains which fares are collected at which terminal and collection procedures."
      ),
  })
  .describe(
    "Represents fare collection description for specific terminal combination including departing/arriving terminal names and collection details. E.g., Anacortes to Friday Harbor with fares collected at Anacortes only. Used for understanding fare collection procedures and determining where fares are paid for specific routes."
  );

export type TerminalComboResponse = z.infer<typeof terminalComboResponseSchema>;

/**
 * Terminal combo verbose response schema for GetTerminalComboVerboseDetail endpoint
 *
 * This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalComboVerboseResponseSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Used as primary key for terminal identification in verbose response."
      ),
    DepartingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of departing terminal, as a terminal name. E.g., 'Anacortes' for terminal 1, null when departing terminal name is unavailable. Provides origin terminal identification for fare collection description."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal, '15' for Orcas Island terminal. Used as primary key for terminal identification in verbose response."
      ),
    ArrivingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of arriving terminal, as a terminal name. E.g., 'Friday Harbor' for terminal 10, 'Lopez Island' for terminal 13, null when arriving terminal name is unavailable. Provides destination terminal identification for fare collection description."
      ),
    CollectionDescription: z
      .string()
      .nullable()
      .describe(
        "Text description of fare collection procedures for terminal combination, as a collection description. E.g., 'Passenger and vehicle/driver fares are collected at Anacortes, while no fares are collected at Friday Harbor' for Anacortes-Friday Harbor route, null when collection description is unavailable. Explains which fares are collected at which terminal and collection procedures."
      ),
  })
  .describe(
    "Represents fare collection description for terminal combination including terminal IDs, names, and collection details. E.g., Anacortes (ID 1) to Friday Harbor (ID 10) with fares collected at Anacortes only. Used for comprehensive fare collection information lookup and understanding collection procedures for all available routes."
  );

export type TerminalComboVerboseResponse = z.infer<
  typeof terminalComboVerboseResponseSchema
>;
