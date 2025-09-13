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
export * from "./vesselBasicss.zod";
export * from "./vesselVerbose.zod";
export * from "./vesselVerboses.zod";

// ============================================================================
// VESSEL ACCOMMODATIONS
// ============================================================================

export * from "./vesselAccommodations.zod";
export * from "./vesselAccommodationss.zod";

// ============================================================================
// VESSEL HISTORY
// ============================================================================

export * from "./vesselHistory.zod";
export * from "./vesselHistorys.zod";

// ============================================================================
// VESSEL LOCATIONS
// ============================================================================

export * from "./vesselLocations.zod";
export * from "./vesselLocationss.zod";

// ============================================================================
// VESSEL STATISTICS
// ============================================================================

export * from "./vesselStats.zod";
export * from "./vesselStatss.zod";
