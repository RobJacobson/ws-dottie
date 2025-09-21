/**
 * @fileoverview WSDOT Weather Information Extended API Schemas
 *
 * This file re-exports all Zod schemas for the WSDOT Weather Information Extended API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSDOT Weather Information Extended functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/traffic/api/} WSDOT API Documentation
 */

// ============================================================================
// WEATHER READING
// ============================================================================

export * from "./weatherReading.zod";
export * from "./weatherReadings.zod";
