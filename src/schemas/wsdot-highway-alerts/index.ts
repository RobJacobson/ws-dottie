/**
 * @fileoverview WSDOT Highway Alerts API Schemas
 * 
 * This file re-exports all Zod schemas for the WSDOT Highway Alerts API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSDOT Highway Alerts functionality.
 * 
 * @see {@link https://www.wsdot.wa.gov/traffic/api/} WSDOT API Documentation
 */

// ============================================================================
// ALERTS
// ============================================================================

export * from "./alerts.zod";

// ============================================================================
// EVENT CATEGORIES
// ============================================================================

export * from "./eventCategories.zod";

// ============================================================================
// MAP AREAS
// ============================================================================

export * from "./mapAreas.zod";
