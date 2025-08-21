import { z } from "zod";

import { zWsdotDate } from "@/shared/validation";

// Base schemas for common patterns
export const dateSchema = zWsdotDate();

export const nullableDateSchema = zWsdotDate().nullable();

// WSF Fares schemas
export const faresCacheFlushDateSchema = dateSchema;

export const faresValidDateRangeSchema = z.object({
  DateFrom: dateSchema,
  DateThru: dateSchema,
});

export const faresTerminalSchema = z.object({
  TerminalID: z.number(),
  Description: z.string(),
});

export const terminalMateSchema = z.object({
  TerminalID: z.number(),
  Description: z.string(),
});

export const terminalComboSchema = z.object({
  DepartingDescription: z.string(),
  ArrivingDescription: z.string(),
  CollectionDescription: z.string(),
});

export const terminalComboVerboseSchema = z.object({
  DepartingTerminalID: z.number(),
  DepartingDescription: z.string(),
  ArrivingTerminalID: z.number(),
  ArrivingDescription: z.string(),
  CollectionDescription: z.string(),
});

export const fareLineItemSchema = z.object({
  FareLineItemID: z.number(),
  FareLineItem: z.string(),
  Category: z.string(),
  DirectionIndependent: z.boolean(),
  Amount: z.number(),
});

export const fareLineItemBasicSchema = z.object({
  FareLineItemID: z.number(),
  FareLineItem: z.string(),
  Category: z.string(),
  DirectionIndependent: z.boolean(),
  Amount: z.number(),
});

export const fareLineItemVerboseSchema = z.object({
  DepartingTerminalID: z.number(),
  DepartingDescription: z.string(),
  ArrivingTerminalID: z.number(),
  ArrivingDescription: z.string(),
  FareLineItemID: z.number(),
  FareLineItem: z.string(),
  Category: z.string(),
  DirectionIndependent: z.boolean(),
  Amount: z.number(),
  RoundTrip: z.boolean(),
});

export const lineItemLookupSchema = z.object({
  TerminalComboIndex: z.number(),
  LineItemIndex: z.number(),
  RoundTripLineItemIndex: z.number(),
});

export const fareLineItemsVerboseResponseSchema = z.object({
  TerminalComboVerbose: z.array(terminalComboVerboseSchema),
  LineItemLookup: z.array(lineItemLookupSchema),
  LineItems: z.array(z.array(fareLineItemSchema)),
  RoundTripLineItems: z.array(z.array(fareLineItemSchema)),
});

export const fareTotalSchema = z.object({
  TotalType: z.number(),
  Description: z.string(),
  BriefDescription: z.string(),
  Amount: z.number(),
});

// Array schemas
export const faresTerminalsArraySchema = z.array(faresTerminalSchema);
export const terminalMatesArraySchema = z.array(terminalMateSchema);
export const terminalComboVerboseArraySchema = z.array(
  terminalComboVerboseSchema
);
export const fareLineItemsArraySchema = z.array(fareLineItemSchema);
export const fareLineItemsBasicArraySchema = z.array(fareLineItemBasicSchema);
export const fareTotalsArraySchema = z.array(fareTotalSchema);

// Export all schemas
export const schemas = {
  faresCacheFlushDate: faresCacheFlushDateSchema,
  faresValidDateRange: faresValidDateRangeSchema,
  faresTerminal: faresTerminalSchema,
  terminalMate: terminalMateSchema,
  terminalCombo: terminalComboSchema,
  terminalComboVerbose: terminalComboVerboseSchema,
  fareLineItem: fareLineItemSchema,
  fareLineItemBasic: fareLineItemBasicSchema,
  fareLineItemVerbose: fareLineItemVerboseSchema,
  lineItemLookup: lineItemLookupSchema,
  fareLineItemsVerboseResponse: fareLineItemsVerboseResponseSchema,
  fareTotal: fareTotalSchema,
  faresTerminalsArray: faresTerminalsArraySchema,
  terminalMatesArray: terminalMatesArraySchema,
  terminalComboVerboseArray: terminalComboVerboseArraySchema,
  fareLineItemsArray: fareLineItemsArraySchema,
  fareLineItemsBasicArray: fareLineItemsBasicArraySchema,
  fareTotalsArray: fareTotalsArraySchema,
} as const;
