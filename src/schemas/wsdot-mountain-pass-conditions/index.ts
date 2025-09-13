/**
 * @fileoverview WSDOT Mountain Pass Conditions API Schemas
 *
 * This file re-exports all Zod schemas for the WSDOT Mountain Pass Conditions API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSDOT Mountain Pass Conditions functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/traffic/api/} WSDOT API Documentation
 */

// ============================================================================
// PASS CONDITIONS
// ============================================================================

export * from "./passCondition.zod";

// ============================================================================
// TRAVEL RESTRICTIONS
// ============================================================================

export * from "./travelRestriction.zod";
