// WSF shared utilities

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
 * Type representing transformed data (with Date objects and camelCase keys)
 */
export type JsonX =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonX[]
  | { [key: string]: JsonX };

/**
 * Generic type for transformed JSON objects
 */
export type TransformedJson = { [key: string]: JsonX };

/**
 * Generic type for transformed JSON arrays
 */
export type TransformedJsonArray = JsonX[];

/**
 * Checks if a string matches YYYY-MM-DD date format
 */
const isYyyyMmDdDate = (str: string): boolean => {
  const yyyyMmDdRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!yyyyMmDdRegex.test(str)) return false;

  // Validate the date is actually valid
  const date = new Date(str);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().split("T")[0] === str
  );
};

/**
 * Checks if a string matches ISO datetime format (YYYY-MM-DDTHH:mm:ss)
 */
const isIsoDateTime = (str: string): boolean => {
  const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (!isoDateTimeRegex.test(str)) return false;

  // Validate the date is actually valid
  const date = new Date(str);
  return !Number.isNaN(date.getTime());
};

/**
 * Checks if a string matches MM/DD/YYYY date format
 */
const isMmDdYyyyDate = (str: string): boolean => {
  const mmDdYyyyRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!mmDdYyyyRegex.test(str)) return false;

  // Validate the date is actually valid
  const [month, day, year] = str.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getFullYear() === year
  );
};

/**
 * Converts a string to a Date object based on its format
 */
const parseDateString = (dateString: string): Date | null => {
  // Handle WSF /Date(timestamp)/ format
  if (dateString.startsWith("/Date(")) {
    const middle = dateString.slice(6, 19);
    const timestamp = parseInt(middle);
    return new Date(timestamp);
  }

  // Handle ISO datetime format (YYYY-MM-DDTHH:mm:ss)
  if (isIsoDateTime(dateString)) {
    return new Date(dateString);
  }

  // Handle YYYY-MM-DD format
  if (isYyyyMmDdDate(dateString)) {
    return new Date(dateString);
  }

  // Handle MM/DD/YYYY format
  if (isMmDdYyyyDate(dateString)) {
    const [month, day, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  return null;
};

/**
 * Recursively transforms WSF API response data:
 * 1. Converts WSF date strings to JavaScript Date objects
 * 2. Converts PascalCase keys to camelCase
 * 3. Handles nested objects and arrays
 */
export const transformWsfData = (data: JsonValue): JsonX => {
  // Handle null input
  if (data === null) {
    return null;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(transformWsfData);
  }

  // Handle objects (but not Date objects, which are also typeof 'object')
  if (typeof data === "object" && data.constructor === Object) {
    const result: { [key: string]: JsonX } = {};
    for (const [key, value] of Object.entries(data)) {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[camelKey] = transformWsfData(value);
    }
    return result;
  }

  // Handle date strings
  if (typeof data === "string") {
    const parsedDate = parseDateString(data);
    if (parsedDate) {
      return parsedDate;
    }
  }

  // Return primitives as-is
  return data;
};
