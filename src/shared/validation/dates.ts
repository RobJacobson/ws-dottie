import { z } from "zod";

// Import proven parsing logic
import { isWsdotDateString, wsdotDateTimestampToJsDate } from "../fetching";

/**
 * Date validation utilities for WSDOT and WSF APIs
 *
 * This module provides comprehensive Zod schemas for validating and transforming
 * date formats used by WSDOT and WSF APIs, with rich descriptions optimized for
 * AI discoverability and Model Context Protocol (MCP) integration.
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
