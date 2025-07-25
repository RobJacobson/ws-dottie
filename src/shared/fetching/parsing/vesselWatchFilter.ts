/**
 * VesselWatch Field Filtering Utilities
 *
 * This module provides utilities for filtering out unreliable VesselWatch fields
 * from VesselLocation API responses. These fields are undocumented and can cause
 * issues in API responses, so they are automatically removed during JSON parsing.
 * They are also verbose and do not provide helpful information.
 *
 * Key Features:
 * - Automatic filtering of unreliable VesselWatch fields
 * - Configurable field list for easy maintenance
 * - Integration with JSON parsing pipeline
 * - Type-safe field filtering
 *
 * Filtered Fields:
 * - VesselWatchShutID: Undocumented and unhelpful shutdown ID field
 * - VesselWatchShutMsg: Undocumented and unhelpful shutdown message field
 * - VesselWatchShutFlag: Undocumented and unhelpful shutdown flag field
 * - VesselWatchStatus: Undocumented and unhelpful status field
 * - VesselWatchMsg: Undocumented and unhelpful message field
 *
 * Usage:
 * ```typescript
 * // Check if a field should be filtered
 * const shouldFilter = filterVesselWatchFields("VesselWatchStatus"); // true
 * const shouldKeep = filterVesselWatchFields("VesselName"); // false
 *
 * // Access the field list directly
 * const fields = Array.from(VESSEL_WATCH_FIELDS);
 * ```
 *
 * Note: This filtering is automatically applied during JSON parsing
 * via the wsdotDateReviver function in parseJson.ts.
 */

/**
 * Undocumented VesselWatch fields to filter out from VesselLocation responses
 * These fields are unreliable and should be removed from API responses
 */
export const VESSEL_WATCH_FIELDS = new Set([
  "VesselWatchShutID",
  "VesselWatchShutMsg",
  "VesselWatchShutFlag",
  "VesselWatchStatus",
  "VesselWatchMsg",
]);

/**
 * Check if a field key should be filtered out as a VesselWatch field
 *
 * @param key - The property key to check
 * @returns true if the field should be filtered out, false otherwise
 *
 * @example
 * ```typescript
 * filterVesselWatchFields("VesselWatchStatus") // Returns true
 * filterVesselWatchFields("VesselName") // Returns false
 * ```
 */
export const filterVesselWatchFields = (key: string): boolean => {
  return VESSEL_WATCH_FIELDS.has(key);
};
