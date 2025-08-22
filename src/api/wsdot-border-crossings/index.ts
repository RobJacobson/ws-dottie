/**
 * WSDOT Border Crossings API - File-per-Endpoint Structure
 *
 * This module provides access to Washington State Department of Transportation
 * border crossing data including real-time wait times and location information.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getBorderCrossings";

// ============================================================================
// REACT QUERY HOOKS
// ============================================================================

export { useBorderCrossings } from "./getBorderCrossings";
