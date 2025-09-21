/**
 * @fileoverview WSF Vessels API Schemas
 *
 * This file re-exports all Zod schemas for the WSF Vessels API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSF Vessels functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/} WSF API Documentation
 */

// ============================================================================
// VESSEL CLASSES
// ============================================================================

export * from "./class.zod";

// ============================================================================
// VESSELS
// ============================================================================

export * from "./vessel.zod";
export * from "./vesselBasics.zod";
export * from "./vesselVerbose.zod";

// ============================================================================
// VESSEL ACCOMMODATIONS
// ============================================================================

export * from "./vesselAccommodations.zod";

// ============================================================================
// VESSEL HISTORY
// ============================================================================

export * from "./vesselHistory.zod";

// ============================================================================
// VESSEL LOCATIONS
// ============================================================================

export * from "./vesselLocations.zod";

// ============================================================================
// VESSEL STATISTICS
// ============================================================================

export * from "./vesselStats.zod";
