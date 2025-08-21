import { z } from "zod";

import { zWsdotDate } from "@/shared/validation";

/**
 * WSF Fares API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Ferries
 * Fares API. These schemas validate and transform the data returned by the API
 * endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// GENERIC DATE SCHEMA
// ============================================================================

// Generic ISO/epoch date schema used by fares endpoints
const zIsoOrEpochDate = () =>
  z
    .union([
      z.date(),
      z.string().transform((val) => new Date(val)),
      z.number().transform((val) => new Date(val)),
    ])
    .transform((d) => (d instanceof Date ? d : new Date(d)))
    .describe(
      "Date value that can be provided as a Date object, ISO string, or epoch timestamp. The API accepts multiple date formats and normalizes them to Date objects."
    );

// ============================================================================
// CACHE FLUSH DATE SCHEMA
// ============================================================================

export const faresCacheFlushDateSchema = zWsdotDate().describe(
  "Timestamp indicating when the fares data was last updated in the WSF system. This field can be used to determine if cached fare data should be refreshed. When this date changes, applications should drop their cache and retrieve fresh data."
);

// ============================================================================
// VALID DATE RANGE SCHEMA
// ============================================================================

export const faresValidDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().describe(
      "Start date of the valid date range for which fares data is currently published and available. This field indicates the earliest date for which fare information can be retrieved."
    ),
    DateThru: zWsdotDate().describe(
      "End date of the valid date range for which fares data is currently published and available. This field indicates the latest date for which fare information can be retrieved."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Date range information indicating when fares data is available. This schema provides the valid date boundaries for fare queries, ensuring that applications only request data for supported dates."
  );

// ============================================================================
// TERMINAL SCHEMAS
// ============================================================================

export const faresTerminalSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this ferry terminal by the WSF system. This ID serves as a permanent, unique reference for the terminal across all WSF systems and can be used for tracking, reporting, and data correlation purposes."
      ),
    Description: z
      .string()
      .describe(
        "Human-readable name for the ferry terminal that provides quick identification. Examples include 'Anacortes', 'Friday Harbor', 'Orcas Island', 'Lopez Island', 'Shaw Island', 'San Juan Island', 'Sidney BC', or 'Victoria BC'. This field is the primary display name used in applications."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Basic terminal information including terminal ID and description. This schema represents essential terminal data used for route planning and fare calculations."
  );

export const terminalMateSchema = faresTerminalSchema.describe(
  "Terminal mate information for arriving terminals. This schema extends the basic terminal schema to represent destinations that can be reached from a specific departing terminal."
);

// ============================================================================
// TERMINAL COMBINATION SCHEMAS
// ============================================================================

export const terminalComboSchema = z
  .object({
    DepartingDescription: z
      .string()
      .describe(
        "Human-readable name for the departing ferry terminal. This field shows the starting point of the ferry route and helps users identify the departure location."
      ),
    ArrivingDescription: z
      .string()
      .describe(
        "Human-readable name for the arriving ferry terminal. This field shows the destination point of the ferry route and helps users identify the arrival location."
      ),
    CollectionDescription: z
      .string()
      .describe(
        "Description of how fares are collected for this terminal combination. This field provides information about the fare collection method, such as 'One-way', 'Round-trip', or specific collection instructions."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Terminal combination information including departure and arrival descriptions, plus fare collection details. This schema represents route information and fare collection methods for specific terminal pairs."
  );

export const terminalComboVerboseSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the departing ferry terminal. This ID can be used to reference the terminal in other API calls and for data correlation purposes."
      ),
    DepartingDescription: z
      .string()
      .describe(
        "Human-readable name for the departing ferry terminal. This field shows the starting point of the ferry route and helps users identify the departure location."
      ),
    ArrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the arriving ferry terminal. This ID can be used to reference the terminal in other API calls and for data correlation purposes."
      ),
    ArrivingDescription: z
      .string()
      .describe(
        "Human-readable name for the arriving ferry terminal. This field shows the destination point of the ferry route and helps users identify the arrival location."
      ),
    CollectionDescription: z
      .string()
      .describe(
        "Description of how fares are collected for this terminal combination. This field provides information about the fare collection method, such as 'One-way', 'Round-trip', or specific collection instructions."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Detailed terminal combination information including terminal IDs, descriptions, and fare collection details. This schema provides comprehensive route information for fare calculations and route planning."
  );

// ============================================================================
// FARE LINE ITEM SCHEMAS
// ============================================================================

export const fareLineItemSchema = z
  .object({
    FareLineItemID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this fare line item by the WSF system. This ID serves as a permanent, unique reference for the fare across all WSF systems and can be used for tracking, reporting, and data correlation purposes."
      ),
    FareLineItem: z
      .string()
      .describe(
        "Human-readable description of the fare line item. Examples include 'Adult', 'Child (6-18)', 'Senior (65+)', 'Disabled', 'Vehicle under 20 feet', 'Vehicle 20-30 feet', 'Motorcycle', or 'Bicycle'. This field is the primary display name used in applications."
      ),
    Category: z
      .string()
      .describe(
        "Category classification for the fare line item. Examples include 'Passenger', 'Vehicle', 'Special', or 'Discount'. This field helps group similar fare types together for display and calculation purposes."
      ),
    DirectionIndependent: z
      .boolean()
      .describe(
        "Whether this fare is independent of travel direction. When true, the same fare applies regardless of whether the passenger is traveling from terminal A to B or B to A. When false, different fares may apply for each direction."
      ),
    Amount: z
      .number()
      .describe(
        "Fare amount in US dollars. This field shows the cost for this specific fare line item and is used for fare calculations and total cost computations."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Basic fare line item information including fare details, category, direction independence, and amount. This schema represents individual fare components that can be combined to calculate total trip costs."
  );

export const fareLineItemBasicSchema = fareLineItemSchema.describe(
  "Basic fare line item schema used for most popular fares. This schema provides essential fare information for common fare types and popular routes."
);

export const fareLineItemVerboseSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the departing ferry terminal. This ID specifies the starting point for this fare calculation."
      ),
    DepartingDescription: z
      .string()
      .describe(
        "Human-readable name for the departing ferry terminal. This field shows the starting point of the ferry route and helps users identify the departure location."
      ),
    ArrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the arriving ferry terminal. This ID specifies the destination point for this fare calculation."
      ),
    ArrivingDescription: z
      .string()
      .describe(
        "Human-readable name for the arriving ferry terminal. This field shows the destination point of the ferry route and helps users identify the arrival location."
      ),
    FareLineItemID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this fare line item by the WSF system. This ID serves as a permanent, unique reference for the fare across all WSF systems."
      ),
    FareLineItem: z
      .string()
      .describe(
        "Human-readable description of the fare line item. Examples include 'Adult', 'Child (6-18)', 'Senior (65+)', 'Disabled', 'Vehicle under 20 feet', 'Vehicle 20-30 feet', 'Motorcycle', or 'Bicycle'."
      ),
    Category: z
      .string()
      .describe(
        "Category classification for the fare line item. Examples include 'Passenger', 'Vehicle', 'Special', or 'Discount'. This field helps group similar fare types together."
      ),
    DirectionIndependent: z
      .boolean()
      .describe(
        "Whether this fare is independent of travel direction. When true, the same fare applies regardless of travel direction. When false, different fares may apply for each direction."
      ),
    Amount: z
      .number()
      .describe(
        "Fare amount in US dollars. This field shows the cost for this specific fare line item and is used for fare calculations and total cost computations."
      ),
    RoundTrip: z
      .boolean()
      .describe(
        "Whether this fare applies to round trip travel. When true, the fare covers both outbound and return journeys. When false, the fare applies to one-way travel only."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Detailed fare line item information including terminal details, fare information, and round trip specification. This schema provides comprehensive fare data for specific routes and trip types."
  );

// ============================================================================
// LINE ITEM LOOKUP SCHEMA
// ============================================================================

export const lineItemLookupSchema = z
  .object({
    TerminalComboIndex: z
      .number()
      .int()
      .min(0)
      .describe(
        "Index into the TerminalComboVerbose array that identifies the specific terminal combination for this fare lookup. This field provides the reference to the route information."
      ),
    LineItemIndex: z
      .number()
      .int()
      .min(0)
      .describe(
        "Index into the LineItems array that identifies the specific fare line items for this lookup. This field provides the reference to the one-way fare information."
      ),
    RoundTripLineItemIndex: z
      .number()
      .int()
      .min(0)
      .describe(
        "Index into the RoundTripLineItems array that identifies the specific round trip fare line items for this lookup. This field provides the reference to the round trip fare information."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Line item lookup information that provides indices into the fare arrays for specific terminal combinations. This schema enables efficient fare lookup and calculation for complex fare structures."
  );

// ============================================================================
// FARE LINE ITEMS VERBOSE RESPONSE SCHEMA
// ============================================================================

export const fareLineItemsVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboVerboseSchema)
      .describe(
        "Array of all valid terminal combinations for the specified trip date. This collection provides comprehensive route information for all available ferry routes."
      ),
    LineItemLookup: z
      .array(lineItemLookupSchema)
      .describe(
        "Array of line item lookup information that maps terminal combinations to their corresponding fare arrays. This collection enables efficient fare lookup and calculation."
      ),
    LineItems: z
      .array(z.array(fareLineItemSchema))
      .describe(
        "Two-dimensional array of fare line items for one-way travel. Each inner array contains the fare line items for a specific terminal combination, indexed by the LineItemIndex from the lookup."
      ),
    RoundTripLineItems: z
      .array(z.array(fareLineItemSchema))
      .describe(
        "Two-dimensional array of fare line items for round trip travel. Each inner array contains the fare line items for a specific terminal combination, indexed by the RoundTripLineItemIndex from the lookup."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Comprehensive fare information response including all terminal combinations, fare line items, and lookup indices. This schema provides complete fare data for all routes on a specific trip date, enabling comprehensive fare calculations and route planning."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const faresTerminalsArraySchema = z
  .array(faresTerminalSchema)
  .describe(
    "Array of valid departing terminals for a specific trip date. This collection provides all available departure points for fare queries and route planning."
  );

export const terminalMatesArraySchema = z
  .array(terminalMateSchema)
  .describe(
    "Array of valid arriving terminals for a specific departing terminal and trip date. This collection provides all available destinations for a given departure point."
  );

export const terminalComboVerboseArraySchema = z
  .array(terminalComboVerboseSchema)
  .describe(
    "Array of all valid terminal combinations for a specific trip date. This collection provides comprehensive route information for all available ferry routes."
  );

export const fareLineItemsArraySchema = z
  .array(fareLineItemSchema)
  .describe(
    "Array of all available fare line items for a specific route and trip type. This collection provides comprehensive fare information for fare calculations."
  );

export const fareLineItemsBasicArraySchema = z
  .array(fareLineItemBasicSchema)
  .describe(
    "Array of most popular fare line items for a specific route and trip type. This collection provides the commonly used fare options for quick fare selection."
  );

// ============================================================================
// FARE TOTALS SCHEMA
// ============================================================================

export const fareTotalsArraySchema = z
  .array(fareLineItemSchema)
  .describe(
    "Array of fare total calculations for a specific combination of fare line items and quantities. This collection provides the calculated total costs for fare combinations."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type FaresCacheFlushDate = z.infer<typeof faresCacheFlushDateSchema>;
export type FaresValidDateRange = z.infer<typeof faresValidDateRangeSchema>;
export type FaresTerminal = z.infer<typeof faresTerminalSchema>;
export type TerminalMate = z.infer<typeof terminalMateSchema>;
export type TerminalCombo = z.infer<typeof terminalComboSchema>;
export type TerminalComboVerbose = z.infer<typeof terminalComboVerboseSchema>;
export type FareLineItem = z.infer<typeof fareLineItemSchema>;
export type FareLineItemBasic = z.infer<typeof fareLineItemBasicSchema>;
export type FareLineItemVerbose = z.infer<typeof fareLineItemVerboseSchema>;
export type LineItemLookup = z.infer<typeof lineItemLookupSchema>;
export type FareLineItemsVerboseResponse = z.infer<
  typeof fareLineItemsVerboseResponseSchema
>;
export type FareTotal = z.infer<typeof fareLineItemSchema>; // Reusing fareLineItemSchema for fare totals
