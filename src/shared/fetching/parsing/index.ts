/**
 * JSON parsing and data transformation utilities
 *
 * This module provides utilities for parsing and transforming API responses,
 * including:
 * - JSON parsing with automatic date conversion
 * - Date parsing for WSDOT and WSF API formats
 */

export {
  isWsdotDateString,
  jsDateToMmDdYyyy,
  jsDateToYyyyMmDd,
  parseMmDdYyyyDate,
  parseMmDdYyyyDateTime,
  WSF_DATE_PARSERS,
  wsdotDateTimestampToJsDate,
} from "./dateParsers";
export {
  type JsonValue,
  type JsonWithDates,
  parseWsdotJson,
} from "./parseJson";
