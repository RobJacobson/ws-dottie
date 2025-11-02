/**
 * @fileoverview Output schemas for WSF Fares API FareLineItems endpoints
 *
 * These schemas define the response structures for WSF Fares API FareLineItems endpoints.
 */

import { z } from "zod";
import { terminalComboVerboseResponseSchema } from "../terminalCombo/terminalCombo.output";

/**
 * Line item response schema used by multiple endpoints
 *
 * This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemResponseSchema = z
  .object({
    FareLineItemID: z
      .number()
      .describe(
        "Unique fare line item identifier, as an integer ID. E.g., '1' for Adult fare, '2' for Senior/Disability fare, '3' for Youth fare. Used as primary key for fare line item identification and fare total calculations."
      ),
    FareLineItem: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of fare line item, as a fare description. E.g., 'Adult (age 19 - 64)' for adult passenger fare, 'Senior (age 65 & over) / <a href=...>Disability</a>' for senior/disability fare, 'Youth (age 18 and under)' for youth fare, null when fare description is unavailable. Provides fare type identification for display and user selection."
      ),
    Category: z
      .string()
      .nullable()
      .describe(
        "Logical grouping category for fare line item, as a category name. E.g., 'Passenger' for passenger fares, 'Vehicle' for vehicle fares, null when category is unavailable. Used for fare type organization and filtering."
      ),
    DirectionIndependent: z
      .boolean()
      .describe(
        "Indicator whether fare amount is independent of departure direction, as a boolean. E.g., false when fare amount varies by departing terminal (Anacortes vs Friday Harbor), true when fare amount is same regardless of departure terminal. Used to determine if fare calculation depends on departure direction."
      ),
    Amount: z
      .number()
      .describe(
        "Fare cost amount, as dollars. E.g., '0' for free fares (when no fare collected at departing terminal), fare amount in dollars for paid fares. Used for fare calculation and total computation."
      ),
  })
  .describe(
    "Represents fare line item information including fare identifier, description, category, direction independence, and amount. E.g., Adult fare (ID 1) in Passenger category with amount $0 (free). Used for fare lookups, fare calculation, and fare total computations."
  );

export type LineItemResponse = z.infer<typeof lineItemResponseSchema>;

/**
 * Line item cross-reference schema for GetFareLineItemsVerboseDetail endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemXrefSchema = z
  .object({
    TerminalComboIndex: z
      .number()
      .describe(
        "Array index referencing terminal combination in TerminalComboVerbose array, as an integer index. E.g., '0' for first terminal combination, '1' for second terminal combination. Used to cross-reference fare line items with terminal combinations in verbose response."
      ),
    LineItemIndex: z
      .number()
      .describe(
        "Array index referencing one-way fare line items in LineItems array, as an integer index. E.g., '0' for first line item array, '1' for second line item array. Used to identify which line items apply to which terminal combination for one-way fares."
      ),
    RoundTripLineItemIndex: z
      .number()
      .describe(
        "Array index referencing round trip fare line items in RoundTripLineItems array, as an integer index. E.g., '0' for first round trip line item array, '1' for second round trip line item array. Used to identify which line items apply to which terminal combination for round trip fares."
      ),
  })
  .describe(
    "Represents cross-reference mapping between terminal combinations and fare line items, including indices for terminal combo, one-way line items, and round trip line items. E.g., terminal combo index 0 maps to line item index 0 and round trip line item index 0. Used for associating fare line items with specific terminal combinations in verbose response."
  );

export type LineItemXref = z.infer<typeof lineItemXrefSchema>;

/**
 * Line item verbose response schema for GetFareLineItemsVerboseDetail endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboVerboseResponseSchema)
      .optional()
      .describe(
        "Array of terminal combination verbose information, as terminal combo objects. E.g., array containing Anacortes-Friday Harbor combination, Anacortes-Lopez Island combination. Provides all valid terminal pairs for trip date."
      ),
    LineItemLookup: z
      .array(lineItemXrefSchema)
      .optional()
      .describe(
        "Array of cross-reference mappings between terminal combinations and fare line items, as line item xref objects. E.g., array mapping each terminal combo to corresponding fare line item arrays. Used to associate fare line items with terminal combinations."
      ),
    LineItems: z
      .array(z.array(lineItemResponseSchema))
      .optional()
      .describe(
        "Array of one-way fare line item arrays, where each inner array contains line items for specific terminal combination, as nested arrays of line item objects. E.g., array containing Adult, Senior, Youth fares for each terminal combo. Used for one-way fare lookups."
      ),
    RoundTripLineItems: z
      .array(z.array(lineItemResponseSchema))
      .optional()
      .describe(
        "Array of round trip fare line item arrays, where each inner array contains line items for specific terminal combination, as nested arrays of line item objects. E.g., array containing Adult, Senior, Youth fares for round trip journeys. Used for round trip fare lookups."
      ),
  })
  .describe(
    "Represents comprehensive fare line item data for all terminal combinations including terminal combo information, cross-reference mappings, one-way fares, and round trip fares. E.g., complete fare data for all routes on November 2, 2025. Used for bulk fare lookups across all routes and comprehensive fare data access."
  );

export type LineItemVerboseResponse = z.infer<
  typeof lineItemVerboseResponseSchema
>;
