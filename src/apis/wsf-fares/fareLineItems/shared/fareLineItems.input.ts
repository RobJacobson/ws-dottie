/**
 * @fileoverview Input schemas for WSF Fares API FareLineItems endpoints
 *
 * These schemas define the input parameters for WSF Fares API FareLineItems endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod";

export const fareLineItemsBasicInputSchema = z
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
    RoundTrip: z
      .boolean()
      .describe("True for round trip fares, false for one-way fares."),
  })
  .describe(
    "Input parameters for retrieving popular fare line items for a terminal combination."
  );

export type FareLineItemsBasicInput = z.infer<
  typeof fareLineItemsBasicInputSchema
>;

export const fareLineItemsByTripDateAndTerminalsInputSchema = z
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
    RoundTrip: z
      .boolean()
      .describe("True for round trip fares, false for one-way fares."),
  })
  .describe(
    "Input parameters for retrieving all fare line items for a terminal combination."
  );

export type FareLineItemsByTripDateAndTerminalsInput = z.infer<
  typeof fareLineItemsByTripDateAndTerminalsInputSchema
>;

export const fareLineItemsVerboseInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range."
      ),
  })
  .describe(
    "Input parameters for retrieving fare line items for all terminal combinations."
  );

export type FareLineItemsVerboseInput = z.infer<
  typeof fareLineItemsVerboseInputSchema
>;
