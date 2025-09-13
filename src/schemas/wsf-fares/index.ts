/**
 * @fileoverview WSF Fares API Schemas
 *
 * This file re-exports all Zod schemas for the WSF Fares API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSF Fares functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/} WSF API Documentation
 */

// ============================================================================
// FARE LINE ITEMS
// ============================================================================

export * from "./fareLineItem.zod";
export * from "./fareLineItems.zod";
export * from "./fareLineItemBasic.zod";
export * from "./fareLineItemsBasic.zod";
export * from "./lineItemXref.zod";
export * from "./lineItem.zod";
export * from "./roundTripLineItem.zod";
export * from "./fareLineItemsVerbose.zod";

// ============================================================================
// FARE TOTALS
// ============================================================================

export * from "./fareTotal.zod";
export * from "./fareTotals.zod";

// ============================================================================
// TERMINAL COMBOS
// ============================================================================

export * from "./terminalCombo.zod";
export * from "./terminalComboVerboseItem.zod";
export * from "./terminalComboVerbose.zod";

// ============================================================================
// TERMINALS
// ============================================================================

export * from "./faresTerminal.zod";
export * from "./faresTerminals.zod";
export * from "./terminalMate.zod";
export * from "./terminalMates.zod";

// ============================================================================
// VALID DATE RANGE
// ============================================================================

export * from "../shared/validDateRange.zod";
