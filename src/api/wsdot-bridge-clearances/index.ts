/**
 * WSDOT Bridge Clearances API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * bridge clearance data including height restrictions and location information.
 *
 * Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getBridgeClearances";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  bridgeDataGisArraySchema,
  bridgeDataGisSchema,
  getBridgeClearancesParamsSchema,
} from "./getBridgeClearances";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  BridgeDataGIS,
  GetBridgeClearancesParams,
} from "./getBridgeClearances";
