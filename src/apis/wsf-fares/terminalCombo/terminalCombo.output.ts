/**
 * @fileoverview Output schemas for WSF Fares API TerminalCombo endpoints
 *
 * These schemas define the response structures for WSF Fares API TerminalCombo endpoints.
 */

import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Terminal combo response schema for GetTerminalComboDetail endpoint
 *
 * This operation describes what fares are collected for a given departing terminal, arriving terminal and trip date. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalComboResponseSchema = z
  .object({
    /** The name of the departing terminal. */
    DepartingDescription: z
      .string()
      .nullable()
      .describe("The name of the departing terminal."),
    /** The name of the arriving terminal. */
    ArrivingDescription: z
      .string()
      .nullable()
      .describe("The name of the arriving terminal."),
    /**
     * Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc).
     */
    CollectionDescription: z
      .string()
      .nullable()
      .describe(
        "Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc)."
      ),
  })
  .describe(
    "This operation describes what fares are collected for a given departing terminal, arriving terminal and trip date. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalComboResponse = z.infer<typeof terminalComboResponseSchema>;

/**
 * Terminal combo verbose response schema for GetTerminalComboVerboseDetail endpoint
 *
 * This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalComboVerboseResponseSchema = z
  .object({
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .describe("Unique identifier for the departing terminal."),
    /** The name of the departing terminal. */
    DepartingDescription: z
      .string()
      .nullable()
      .describe("The name of the departing terminal."),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .describe("Unique identifier for the arriving terminal."),
    /** The name of the arriving terminal. */
    ArrivingDescription: z
      .string()
      .nullable()
      .describe("The name of the arriving terminal."),
    /**
     * Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc).
     */
    CollectionDescription: z
      .string()
      .nullable()
      .describe(
        "Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc)."
      ),
  })
  .describe(
    "This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalComboVerboseResponse = z.infer<
  typeof terminalComboVerboseResponseSchema
>;
