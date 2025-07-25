/**
 * JSON parsing utilities for WSDOT and WSF APIs
 *
 * This module provides the core JSON parsing functionality with automatic transformation:
 * - Uses imported date parsing functions from dateParsers.ts
 * - Uses imported VesselWatch filtering from vesselWatchFilter.ts
 * - Preserves PascalCase property names
 * - Normalizes empty responses based on expected type
 *
 * The module focuses solely on JSON parsing and transformation, delegating
 * specialized concerns (date parsing, field filtering) to dedicated modules.
 */

import {
  isWsdotDateString,
  WSF_DATE_PARSERS,
  wsdotDateTimestampToJsDate,
} from "./dateParsers";
import { filterVesselWatchFields } from "./vesselWatchFilter";

/**
 * Type representing JSON-like data that can be transformed
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Type representing transformed data with Date objects and preserved PascalCase keys
 * Note: Properties can be removed by returning undefined in the reviver function
 */
export type JsonWithDates =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonWithDates[]
  | { [key: string]: JsonWithDates };

/**
 * Parse JSON string with automatic WSDOT and WSF date conversion and response normalization
 *
 * This is the main public function that combines JSON parsing with date conversion
 * and empty response normalization. It handles the complete transformation pipeline:
 * 1. Parse JSON with date reviver
 * 2. Normalize empty responses based on expected type
 *
 * @param text - The JSON string to parse
 * @param expectedType - The expected return type ('array' or 'object') for normalization
 * @returns The parsed and normalized object with Date objects for date strings
 *
 * @example
 * ```typescript
 * // WSDOT API response
 * const wsdotJson = '{"Time": "/Date(1753121700000-0700)/", "Name": "Test"}';
 * const data = parseWsdotJson(wsdotJson, 'object');
 * // data.Time is now a Date object, data.Name remains a string
 *
 * // WSF Schedule API response with empty response normalization
 * const wsfJson = '{}'; // Empty response
 * const data = parseWsdotJson(wsfJson, 'array');
 * // data is now [] instead of {}
 *
 * // With TypeScript typing
 * interface ApiResponse { Time: Date; Name: string; }
 * const data = parseWsdotJson<ApiResponse>(wsdotJson, 'object');
 * ```
 */
export const parseWsdotJson = <T = JsonWithDates>(text: string): T =>
  JSON.parse(text, wsdotDateReviver);

/**
 * JSON reviver function that transforms WSDOT and WSF API data
 *
 * Handles:
 * - WSF Schedule date formats (FromDate, ThruDate, ModifiedDate)
 * - WSDOT date strings in "/Date(timestamp)/" format
 * - Filters out unreliable VesselWatch fields from VesselLocation objects
 * - Preserves all other data types unchanged
 *
 * @param key - The property key (used to identify specific date fields)
 * @param value - The property value to potentially transform
 * @returns The original value, a Date object if the value was a date string, or undefined to remove the property
 *
 * @example
 * ```typescript
 * // WSDOT API response
 * const wsdotJson = '{"Time": "/Date(1753121700000-0700)/", "Name": "Test"}';
 * const data = JSON.parse(wsdotJson, wsdotDateReviver);
 * // data.Time is now a Date object, data.Name remains a string
 *
 * // WSF Schedule API response
 * const wsfJson = '{"FromDate": "12/25/2024", "ModifiedDate": "12/25/2024 02:30:45 PM"}';
 * const data = JSON.parse(wsfJson, wsdotDateReviver);
 * // Both FromDate and ModifiedDate are now Date objects
 *
 * // Undocumented VesselWatch fields are removed from the result
 * ```
 */
const wsdotDateReviver = (
  key: string,
  value: JsonValue
): JsonWithDates | undefined => {
  // Filter out unreliable VesselWatch fields from VesselLocation objects
  if (filterVesselWatchFields(key)) {
    return undefined;
  }

  // Early return for non-string values
  if (typeof value !== "string") {
    return value;
  }

  // Handle WSF Schedule field-specific date parsing
  const wsfParser = WSF_DATE_PARSERS.get(key);
  if (wsfParser) {
    return wsfParser(value);
  }

  // Handle WSDOT date strings
  if (isWsdotDateString(value)) {
    return wsdotDateTimestampToJsDate(value);
  }

  return value;
};
