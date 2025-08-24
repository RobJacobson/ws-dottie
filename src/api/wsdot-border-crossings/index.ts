/**
 * WSDOT Border Crossings API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * border crossing data including real-time wait times and location information.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getBorderCrossings";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  borderCrossingDataArraySchema,
  borderCrossingDataSchema,
  getBorderCrossingsParamsSchema,
} from "./getBorderCrossings";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  BorderCrossingData,
  GetBorderCrossingsParams,
} from "./getBorderCrossings";
