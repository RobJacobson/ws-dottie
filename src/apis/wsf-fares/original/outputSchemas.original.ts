/**
 * @fileoverview Output schemas for WSF Fares API endpoints
 *
 * These schemas define the response structures for WSF Fares API endpoints.
 */

import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Cache flush date response schema for GetCacheFlushDate endpoint
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateResponseSchema = z
  .object({
    /** If present, notes the date that certain service data was last changed (see description). */
    CacheFlushDate: zWsdotDate()
      .optional()
      .describe(
        "If present, notes the date that certain service data was last changed (see description)."
      ),
  })
  .describe(
    "Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service."
  );

export type FaresCacheFlushDateResponse = z.infer<
  typeof cacheFlushDateResponseSchema
>;

/**
 * Valid date range response schema for GetValidDateRange endpoint
 *
 * This operation retrieves a date range for which fares data is currently published & available. */
export const validDateRangeResponseSchema = z
  .object({
    /**
     * Fares information is available from this date onward.
     */
    DateFrom: zWsdotDate().describe(
      "Fares information is available from this date onward."
    ),
    /**
     * Fares information is not available after this date.
     */
    DateThru: zWsdotDate().describe(
      "Fares information is not available after this date."
    ),
  })
  .describe(
    "This operation retrieves a date range for which fares data is currently published & available."
  );

export type ValidDateRangeResponse = z.infer<
  typeof validDateRangeResponseSchema
>;

/**
 * Base terminal schema for fares API
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalBaseSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  /** The name of the terminal. */
  Description: z.string().describe("The name of the terminal."),
});

export type TerminalBase = z.infer<typeof terminalBaseSchema>;

/**
 * Terminal response schema used by multiple endpoints
 */
export const terminalResponseSchema = terminalBaseSchema;

export type TerminalResponse = z.infer<typeof terminalResponseSchema>;

/**
 * List of terminal responses schema
 */
export const terminalResponsesListSchema = z
  .array(terminalResponseSchema)
  .describe(
    "This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalResponseList = z.infer<typeof terminalResponsesListSchema>;

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

/**
 * List of terminal combo verbose responses schema
 */
export const terminalComboVerboseResponsesListSchema = z
  .array(terminalComboVerboseResponseSchema)
  .describe(
    "This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalComboVerboseResponseList = z.infer<
  typeof terminalComboVerboseResponsesListSchema
>;

/**
 * Line item response schema used by multiple endpoints
 *
 * This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemResponseSchema = z.object({
  /** Unique identifier for a line item. */
  FareLineItemID: z.number().describe("Unique identifier for a line item."),
  /** A description of the fare (eg. "Adult (age 19 - 64)"). */
  FareLineItem: z
    .string()
    .nullable()
    .describe('A description of the fare (eg. "Adult (age 19 - 64)").'),
  /** A logical grouping that the fare belongs to (eg. "Passenger"). */
  Category: z
    .string()
    .nullable()
    .describe('A logical grouping that the fare belongs to (eg. "Passenger").'),
  /**
   * A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal.
   */
  DirectionIndependent: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal."
    ),
  /** The cost of the fare in dollars. */
  Amount: z.number().describe("The cost of the fare in dollars."),
});

export type LineItemResponse = z.infer<typeof lineItemResponseSchema>;

/**
 * List of line item responses schema
 */
export const lineItemResponsesListSchema = z
  .array(lineItemResponseSchema)
  .describe(
    "This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type LineItemResponseList = z.infer<typeof lineItemResponsesListSchema>;

/**
 * List of lists of line item responses schema
 */
export const lineItemResponsesListListSchema = z
  .array(lineItemResponsesListSchema)
  .describe(
    "This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type LineItemResponseListList = z.infer<
  typeof lineItemResponsesListListSchema
>;

/**
 * Line item cross-reference schema for GetFareLineItemsVerboseDetail endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemXrefSchema = z
  .object({
    /** An array index from TerminalComboVerbose. */
    TerminalComboIndex: z
      .number()
      .describe("An array index from TerminalComboVerbose."),
    /** An array index from LineItems. */
    LineItemIndex: z.number().describe("An array index from LineItems."),
    /** An array index from RoundTripLineItems. */
    RoundTripLineItemIndex: z
      .number()
      .describe("An array index from RoundTripLineItems."),
  })
  .describe(
    "This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type LineItemXref = z.infer<typeof lineItemXrefSchema>;

/**
 * List of line item cross-references schema
 */
export const lineItemXrefsListSchema = z
  .array(lineItemXrefSchema)
  .describe(
    "This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type LineItemXrefList = z.infer<typeof lineItemXrefsListSchema>;

/**
 * Line item verbose response schema for GetFareLineItemsVerboseDetail endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemVerboseResponseSchema = z
  .object({
    /** All valid terminal combinations associated with the trip date. */
    TerminalComboVerbose: terminalComboVerboseResponsesListSchema
      .nullable()
      .describe(
        "All valid terminal combinations associated with the trip date."
      ),
    /**
     * Associates a terminal combination with a one-way fare and a round trip fare for the given trip date.
     */
    LineItemXref: lineItemXrefsListSchema
      .nullable()
      .describe(
        "Associates a terminal combination with a one-way fare and a round trip fare for the given trip date."
      ),
    /** All one-way fare line items associated with the trip date. */
    LineItems: lineItemResponsesListListSchema
      .nullable()
      .describe("All one-way fare line items associated with the trip date."),
    /** All round trip line items associated with the trip date. */
    RoundTripLineItems: lineItemResponsesListListSchema
      .nullable()
      .describe("All round trip line items associated with the trip date."),
  })
  .describe(
    "This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type LineItemVerboseResponse = z.infer<
  typeof lineItemVerboseResponseSchema
>;

/**
 * Fare total type enum for GetFareTotals endpoint
 */
export const fareTotalTypeSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
  .describe(
    "Indicates a logical grouping for the total. 1 for Departing, 2 for Return, 3 for Either (direction independent) and 4 for Total."
  );

export type FareTotalType = z.infer<typeof fareTotalTypeSchema>;

/**
 * Fare total response schema for GetFareTotals endpoint
 *
 * This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const fareTotalResponseSchema = z
  .object({
    /**
     * Indicates a logical grouping for the total. 1 for Departing, 2 for Return, 3 for Either (direction independent) and 4 for Total.
     */
    FareTotalType: fareTotalTypeSchema.describe(
      "Indicates a logical grouping for the total. 1 for Departing, 2 for Return, 3 for Either (direction independent) and 4 for Total."
    ),
    /** A description of the amount. */
    Description: z.string().nullable().describe("A description of the amount."),
    /** A string representation of the FareTotalType. */
    BriefDescription: z
      .string()
      .nullable()
      .describe("A string representation of the FareTotalType."),
    /** A total of the fares in dollars. */
    Amount: z.number().describe("A total of the fares in dollars."),
  })
  .describe(
    "This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type FareTotalResponse = z.infer<typeof fareTotalResponseSchema>;

/**
 * List of fare total responses schema
 */
export const fareTotalResponsesListSchema = z
  .array(fareTotalResponseSchema)
  .describe(
    "This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type FareTotalResponseList = z.infer<
  typeof fareTotalResponsesListSchema
>;
