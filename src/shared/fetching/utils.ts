// WSF shared utilities

import { wsdotDateToJsDate } from "./dateUtils";

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
 * Type representing transformed data (with Date objects and PascalCase keys preserved)
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
 * Generic type for transformed JSON objects
 */
export type TransformedJson = { [key: string]: JsonWithDates };

/**
 * Generic type for transformed JSON arrays
 */
export type TransformedJsonArray = JsonWithDates[];

/**
 * Recursively transforms WSF API response data:
 * 1. Converts WSF date strings to JavaScript Date objects
 * 2. Preserves PascalCase keys (no longer converts to camelCase)
 * 3. Handles nested objects and arrays
 */
export const transformWsdotData = (data: JsonValue): JsonWithDates => {
  // Handle null input
  if (data === null) {
    return null;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(transformWsdotData);
  }

  // Handle objects (but not Date objects, which are also typeof 'object')
  if (typeof data === "object" && data.constructor === Object) {
    const result: { [key: string]: JsonWithDates } = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = transformWsdotData(value);
    }
    return result;
  }

  // Handle date strings - try to parse, returns original string if not a date
  if (typeof data === "string") {
    const parsedDate = wsdotDateToJsDate(data);
    if (parsedDate !== null) {
      return parsedDate;
    }
    // If not a date, return the original string (empty strings remain empty)
    return data;
  }

  // Return primitives as-is
  return data;
};
