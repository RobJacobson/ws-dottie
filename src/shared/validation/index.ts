import { z } from "zod";

// Import proven parsing logic
import {
  isWsdotDateString,
  wsdotDateTimestampToJsDate,
  parseMmDdYyyyDate,
  parseMmDdYyyyDateTime,
} from "../fetching/parsing/dateParsers";

/**
 * Enhanced Zod validation utilities for WS-Dottie with MCP-ready descriptions
 *
 * This module provides comprehensive Zod schemas for validating and transforming
 * WSDOT and WSF API data, with rich descriptions optimized for AI discoverability
 * and Model Context Protocol (MCP) integration.
 */

// WSDOT date format with rich MCP description
export const zWsdotDate = () =>
  z
    .string()
    .refine(isWsdotDateString, {
      message:
        "Invalid WSDOT date format. Expected format: /Date(timestamp)/ where timestamp is milliseconds since Unix epoch",
    })
    .transform((val) => {
      const date = wsdotDateTimestampToJsDate(val);
      if (!date) throw new Error(`Failed to parse WSDOT date: ${val}`);
      return date;
    })
    .describe(
      "WSDOT API date in Microsoft .NET JSON format like '/Date(1753121700000)/' or '/Date(1753121700000-0700)/'. Represents milliseconds since Unix epoch (January 1, 1970), automatically converted to JavaScript Date object. Used across all WSDOT APIs for timestamps including highway alerts, weather data, and traffic information. The optional timezone offset (e.g., -0700) represents Pacific Time adjustments."
    );

export const zWsdotNullableDate = () =>
  zWsdotDate()
    .nullable()
    .describe(
      "WSDOT API date that may be null when no timestamp is available. Same format as zWsdotDate but allows null values for optional date fields."
    );

// WSF Schedule date formats with rich MCP descriptions
export const zWsfDate = () =>
  z
    .string()
    .transform((val) => {
      const date = parseMmDdYyyyDate(val);
      if (!date)
        throw new Error(
          `Invalid WSF date format: ${val}. Expected MM/DD/YYYY format.`
        );
      return date;
    })
    .describe(
      "WSF API date in American MM/DD/YYYY format like '12/25/2024' or '1/5/2024'. Used in ferry schedules for departure dates, valid date ranges, and service periods. Single-digit months and days are acceptable (e.g., '1/5/2024'). Automatically converted to JavaScript Date object in Pacific Time zone. Note: WSF dates assume Pacific Time regardless of daylight saving changes."
    );

export const zWsfDateTime = () =>
  z
    .string()
    .transform((val) => {
      const date = parseMmDdYyyyDateTime(val);
      if (!date)
        throw new Error(
          `Invalid WSF datetime format: ${val}. Expected MM/DD/YYYY HH:MM:SS AM/PM format.`
        );
      return date;
    })
    .describe(
      "WSF API datetime in American format like '12/25/2024 02:30:45 PM' or '1/5/2024 12:00:00 AM'. Used in ferry schedules for precise sailing times, last modified timestamps, and departure/arrival times. Supports both 12-hour format with AM/PM indicators. Automatically converted to JavaScript Date object in Pacific Time zone. Essential for real-time ferry tracking and schedule accuracy."
    );

// Common nullable field utilities with MCP descriptions
export const zNullableString = () =>
  z
    .string()
    .nullable()
    .describe(
      "Text field that may be null when no data is available. Common in API responses where optional information might not be provided by the data source."
    );

export const zNullableNumber = () =>
  z
    .number()
    .nullable()
    .describe(
      "Numeric field that may be null when no measurement or count is available. Used for optional metrics, measurements, or identifiers that might not apply to all records."
    );

export const zNullableBoolean = () =>
  z
    .boolean()
    .nullable()
    .describe(
      "Boolean field that may be null when the true/false status is unknown or not applicable. Common for optional feature flags or conditional properties."
    );

// Enhanced date utilities that handle both string and Date inputs
export const zFlexibleDate = () =>
  z
    .union([z.string().transform((val) => new Date(val)), z.date()])
    .describe(
      "Flexible date field that accepts either ISO date strings or JavaScript Date objects. Automatically converts string inputs to Date objects for consistent handling."
    );

// Validation helpers for common parameter patterns
export const zPositiveInteger = (fieldName: string) =>
  z
    .number()
    .int()
    .positive()
    .describe(
      `Positive integer identifier for ${fieldName}. Must be greater than 0. Used to uniquely identify records in the API system.`
    );

export const zOptionalPositiveInteger = (fieldName: string) =>
  z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      `Optional positive integer identifier for ${fieldName}. When provided, must be greater than 0. Used for optional filtering or identification parameters.`
    );

// Geographic coordinate validation with MCP descriptions
export const zLatitude = () =>
  z
    .number()
    .min(-90)
    .max(90)
    .describe(
      "Latitude coordinate in decimal degrees using WGS84 coordinate system. Range is -90 to 90 degrees, where positive values are North of the equator and negative values are South. Washington State typically ranges from approximately 45.5 to 49.0 degrees North. Used for precise geographic positioning of vessels, terminals, cameras, and weather stations."
    );

export const zLongitude = () =>
  z
    .number()
    .min(-180)
    .max(180)
    .describe(
      "Longitude coordinate in decimal degrees using WGS84 coordinate system. Range is -180 to 180 degrees, where negative values are West of the Prime Meridian. Washington State typically ranges from approximately -124.8 to -116.9 degrees West. Used for precise geographic positioning of vessels, terminals, cameras, and weather stations."
    );
