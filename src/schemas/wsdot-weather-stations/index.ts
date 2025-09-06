/**
 * @fileoverview WSDOT Weather Stations API Schemas
 *
 * This file re-exports all Zod schemas for the WSDOT Weather Stations API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSDOT Weather Stations functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/traffic/api/} WSDOT API Documentation
 */

// ============================================================================
// WEATHER STATIONS
// ============================================================================

export * from "./weatherStations.zod";
