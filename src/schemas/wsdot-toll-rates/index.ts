/**
 * @fileoverview WSDOT Toll Rates API Schemas
 *
 * This file re-exports all Zod schemas for the WSDOT Toll Rates API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSDOT Toll Rates functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/traffic/api/} WSDOT API Documentation
 */

// ============================================================================
// TOLL RATES
// ============================================================================

export * from "./tollRates.zod";

// ============================================================================
// TOLL LOCATION
// ============================================================================

export * from "./tollLocation.zod";

// ============================================================================
// TOLL TRIP INFO
// ============================================================================

export * from "./tollTripInfo.zod";

// ============================================================================
// TOLL TRIP RATES / TRIP RATES
// ============================================================================

export * from "./tollTripRates.zod";

// ============================================================================
// TOLL TRIP VERSION
// ============================================================================

export * from "./tollTripVersion.zod";

// ============================================================================
// TRIP RATE
// ============================================================================

export * from "./tripRate.zod";

// ============================================================================
// TRIP RATES BY DATE
// ============================================================================

export * from "./tripRatesByDate.zod";
