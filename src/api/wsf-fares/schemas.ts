import { z } from "zod";

// Generic ISO/epoch date schema used by fares endpoints
const zIsoOrEpochDate = () =>
  z
    .union([
      z.date(),
      z.string().transform((val) => new Date(val)),
      z.number().transform((val) => new Date(val)),
    ])
    .transform((d) => (d instanceof Date ? d : new Date(d)));

export const faresCacheFlushDateSchema = zIsoOrEpochDate();

export const faresValidDateRangeSchema = z
  .object({
    DateFrom: zIsoOrEpochDate(),
    DateThru: zIsoOrEpochDate(),
  })
  .catchall(z.unknown());

export const faresTerminalSchema = z
  .object({
    TerminalID: z.number(),
    Description: z.string(),
  })
  .catchall(z.unknown());

export const terminalMateSchema = faresTerminalSchema;

export const terminalComboSchema = z
  .object({
    DepartingDescription: z.string(),
    ArrivingDescription: z.string(),
    CollectionDescription: z.string(),
  })
  .catchall(z.unknown());

export const terminalComboVerboseSchema = z
  .object({
    DepartingTerminalID: z.number(),
    DepartingDescription: z.string(),
    ArrivingTerminalID: z.number(),
    ArrivingDescription: z.string(),
    CollectionDescription: z.string(),
  })
  .catchall(z.unknown());

export const fareLineItemSchema = z
  .object({
    FareLineItemID: z.number(),
    FareLineItem: z.string(),
    Category: z.string(),
    DirectionIndependent: z.boolean(),
    Amount: z.number(),
  })
  .catchall(z.unknown());

export const fareLineItemBasicSchema = fareLineItemSchema;

export const fareLineItemVerboseSchema = z
  .object({
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
  })
  .catchall(z.unknown());

export const lineItemLookupSchema = z
  .object({
    TerminalComboIndex: z.number(),
    LineItemIndex: z.number(),
    RoundTripLineItemIndex: z.number(),
  })
  .catchall(z.unknown());

export const fareLineItemsVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z.array(terminalComboVerboseSchema),
    LineItemLookup: z.array(lineItemLookupSchema),
    LineItems: z.array(z.array(fareLineItemSchema)),
    RoundTripLineItems: z.array(z.array(fareLineItemSchema)),
  })
  .catchall(z.unknown());

// Array schemas
export const faresTerminalsArraySchema = z.array(faresTerminalSchema);
export const terminalMatesArraySchema = z.array(terminalMateSchema);
export const terminalComboVerboseArraySchema = z.array(
  terminalComboVerboseSchema
);
export const fareLineItemsArraySchema = z.array(fareLineItemSchema);
export const fareLineItemsBasicArraySchema = z.array(fareLineItemBasicSchema);
export const fareTotalsArraySchema = z.array(
  z
    .object({
      TotalType: z.number(),
      Description: z.string(),
      BriefDescription: z.string(),
      Amount: z.number(),
    })
    .catchall(z.unknown())
);

// Inferred types
export type FaresCacheFlushDate = z.infer<typeof faresCacheFlushDateSchema>;
export type FaresValidDateRange = z.infer<typeof faresValidDateRangeSchema>;
export type FaresTerminal = z.infer<typeof faresTerminalSchema>;
export type TerminalMate = z.infer<typeof terminalMateSchema>;
export type TerminalCombo = z.infer<typeof terminalComboSchema>;
export type TerminalComboVerbose = z.infer<typeof terminalComboVerboseSchema>;
export type FareLineItem = z.infer<typeof fareLineItemSchema>;
export type FareLineItemBasic = z.infer<typeof fareLineItemBasicSchema>;
export type FareLineItemVerbose = z.infer<typeof fareLineItemVerboseSchema>;
export type FareLineItemsVerboseResponse = z.infer<
  typeof fareLineItemsVerboseResponseSchema
>;
export type FareTotal = z.infer<(typeof fareTotalsArraySchema)["element"]>;
