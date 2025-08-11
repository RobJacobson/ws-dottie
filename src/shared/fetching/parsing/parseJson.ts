/**
 * JSON parsing utilities for WSDOT and WSF APIs
 *
 * Lean JSON parsing with a reviver that converts known WSDOT/WSF date string
 * formats into JavaScript Date objects. It:
 * - Uses helpers from `dateParsers.ts` (WSF field-specific dates and WSDOT "/Date(...)" strings)
 * - Preserves upstream PascalCase property names
 * - Performs no field filtering and no structural normalization
 *
 * Note: Structural validation and additional transformations are handled by Zod
 * schemas downstream. This file intentionally keeps parsing minimal.
 */

import {
  isWsdotDateString,
  WSF_DATE_PARSERS,
  wsdotDateTimestampToJsDate,
} from "./dateParsers";
// Note: We intentionally do not filter VesselWatch fields here to keep responses pass-through

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
 * Parse JSON string with automatic WSDOT and WSF date conversion.
 *
 * @param text - The JSON string to parse
 * @returns The parsed object with Date objects for recognized date strings
 *
 * @example
 * ```typescript
 * // WSDOT API response
 * const wsdotJson = '{"Time": "/Date(1753121700000-0700)/", "Name": "Test"}';
 * const data = parseWsdotJson(wsdotJson);
 * // data.Time is now a Date object, data.Name remains a string
 *
 * // With TypeScript typing
 * interface ApiResponse { Time: Date; Name: string; }
 * const typed = parseWsdotJson<ApiResponse>(wsdotJson);
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
 */
const wsdotDateReviver = (
  key: string,
  value: JsonValue
): JsonWithDates | undefined => {
  // Early return for non-string values
  if (typeof value !== "string") {
    return value;
  }

  // Handle WSF Schedule field-specific date parsing
  const wsfDateParser = WSF_DATE_PARSERS.get(key);
  if (wsfDateParser) {
    return wsfDateParser(value);
  }

  // Handle WSDOT date strings
  if (isWsdotDateString(value)) {
    return wsdotDateTimestampToJsDate(value);
  }

  return value;
};
