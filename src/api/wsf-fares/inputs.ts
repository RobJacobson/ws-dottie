import { z } from "zod";

/**
 * Input parameter schemas for WSF Fares API
 *
 * This API provides comprehensive fare information for Washington State Ferries,
 * including terminal information, fare line items, and fare calculations.
 */

// No input parameters currently needed for getFaresCacheFlushDate
// This schema represents an empty parameter object for consistency
export const getFaresCacheFlushDateParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting cache flush date. The API returns the date when fares data was last updated, which can be used to determine if cached data should be refreshed."
  );

// No input parameters currently needed for getFaresValidDateRange
// This schema represents an empty parameter object for consistency
export const getFaresValidDateRangeParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting valid date range. The API returns the date range for which fares data is currently published and available."
  );

// Parameter schema for getFaresTerminals
export const getFaresTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve valid departing terminals. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
  })
  .describe(
    "Parameters for retrieving valid departing terminals for a specific trip date"
  );

// Parameter schema for getFaresTerminalMates
export const getFaresTerminalMatesParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve arriving terminals. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
    terminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the departing terminal. This ID can be obtained from the getFaresTerminals endpoint."
      ),
  })
  .describe(
    "Parameters for retrieving arriving terminals for a specific departing terminal and trip date"
  );

// Parameter schema for getTerminalCombo
export const getTerminalComboParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve terminal combination information. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
    departingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the departing terminal. This ID can be obtained from the getFaresTerminals endpoint."
      ),
    arrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the arriving terminal. This ID can be obtained from the getFaresTerminalMates endpoint."
      ),
  })
  .describe(
    "Parameters for retrieving fare collection description for a specific terminal combination"
  );

// Parameter schema for getTerminalComboVerbose
export const getTerminalComboVerboseParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve all terminal combinations. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
  })
  .describe(
    "Parameters for retrieving all valid terminal combinations for a specific trip date"
  );

// Parameter schema for getFareLineItemsBasic
export const getFareLineItemsBasicParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve fare line items. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
    departingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the departing terminal. This ID can be obtained from the getFaresTerminals endpoint."
      ),
    arrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the arriving terminal. This ID can be obtained from the getFaresTerminalMates endpoint."
      ),
    roundTrip: z
      .boolean()
      .describe(
        "Whether this is a round trip. Set to true for round trip fares, false for one-way fares."
      ),
  })
  .describe(
    "Parameters for retrieving most popular fare line items for a specific route and trip type"
  );

// Parameter schema for getFareLineItems
export const getFareLineItemsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve fare line items. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
    departingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the departing terminal. This ID can be obtained from the getFaresTerminals endpoint."
      ),
    arrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the arriving terminal. This ID can be obtained from the getFaresTerminalMates endpoint."
      ),
    roundTrip: z
      .boolean()
      .describe(
        "Whether this is a round trip. Set to true for round trip fares, false for one-way fares."
      ),
  })
  .describe(
    "Parameters for retrieving all available fare line items for a specific route and trip type"
  );

// Parameter schema for getFareLineItemsVerbose
export const getFareLineItemsVerboseParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve all fare line items. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
  })
  .describe(
    "Parameters for retrieving all fare line items for all terminal combinations on a specific trip date"
  );

// Parameter schema for getFareTotals
export const getFareTotalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to calculate fare totals. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
    departingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the departing terminal. This ID can be obtained from the getFaresTerminals endpoint."
      ),
    arrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the arriving terminal. This ID can be obtained from the getFaresTerminalMates endpoint."
      ),
    roundTrip: z
      .boolean()
      .describe(
        "Whether this is a round trip. Set to true for round trip fares, false for one-way fares."
      ),
    fareLineItemIDs: z
      .array(z.number().int().positive())
      .min(1, "At least one fare line item ID must be provided")
      .describe(
        "Array of fare line item IDs to include in the fare calculation. These IDs can be obtained from the getFareLineItems endpoint."
      ),
    quantities: z
      .array(z.number().int().min(1))
      .min(1, "At least one quantity must be provided")
      .describe(
        "Array of quantities corresponding to the fare line item IDs. The length must match the fareLineItemIDs array."
      ),
  })
  .refine((data) => data.fareLineItemIDs.length === data.quantities.length, {
    message: "fareLineItemIDs and quantities arrays must have the same length",
    path: ["quantities"],
  })
  .describe(
    "Parameters for calculating fare totals for a specific combination of fare line items and quantities"
  );

// Export the inferred types for use in API functions
export type GetFaresCacheFlushDateParams = z.infer<
  typeof getFaresCacheFlushDateParamsSchema
>;
export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;
export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;
export type GetFaresTerminalMatesParams = z.infer<
  typeof getFaresTerminalMatesParamsSchema
>;
export type GetTerminalComboParams = z.infer<
  typeof getTerminalComboParamsSchema
>;
export type GetTerminalComboVerboseParams = z.infer<
  typeof getTerminalComboVerboseParamsSchema
>;
export type GetFareLineItemsBasicParams = z.infer<
  typeof getFareLineItemsBasicParamsSchema
>;
export type GetFareLineItemsParams = z.infer<
  typeof getFareLineItemsParamsSchema
>;
export type GetFareLineItemsVerboseParams = z.infer<
  typeof getFareLineItemsVerboseParamsSchema
>;
export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;
