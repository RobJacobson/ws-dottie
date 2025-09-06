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

export * from "./fareLineItems.zod";
export * from "./fareLineItemsBasic.zod";
export * from "./fareLineItemsVerbose.zod";

// ============================================================================
// FARE TOTALS
// ============================================================================

export * from "./fareTotals.zod";

// ============================================================================
// TERMINAL COMBOS
// ============================================================================

export * from "./terminalCombo.zod";
export * from "./terminalComboVerbose.zod";

// ============================================================================
// TERMINALS
// ============================================================================

export * from "./faresTerminal.zod";
export * from "./terminalMates.zod";

// ============================================================================
// VALID DATE RANGE
// ============================================================================

export * from "./validDateRange.zod";
