/**
 * JSON parsing and data transformation utilities
 *
 * This module provides utilities for parsing and transforming API responses,
 * including:
 * - Date parsing for WSDOT and WSF API formats
 */

export {
  isWsdotDateString,
  jsDateToMmDdYyyy,
  jsDateToYyyyMmDd,
  parseMmDdYyyyDate,
  parseMmDdYyyyDateTime,
  wsdotDateTimestampToJsDate,
} from "./dateParsers";

// JSON types for API parameters
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonValue[]
  | { [key: string]: JsonValue };

export type JsonWithDates =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonWithDates[]
  | { [key: string]: JsonWithDates };
