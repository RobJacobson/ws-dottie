/**
 * @fileoverview WSDOT Traffic Flow API Schemas
 *
 * This file re-exports all Zod schemas for the WSDOT Traffic Flow API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSDOT Traffic Flow functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/traffic/api/} WSDOT API Documentation
 */

// ============================================================================
// TRAFFIC FLOW
// ============================================================================

export * from "./flowData.zod";
export * from "./trafficFlows.zod";
