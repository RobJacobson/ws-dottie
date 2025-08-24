import { z } from "zod";

/**
 * Basic field validation utilities for WSDOT and WSF APIs
 *
 * This module provides common Zod schemas for validating basic field types
 * used across all API responses, with rich descriptions optimized for
 * AI discoverability and Model Context Protocol (MCP) integration.
 */

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

// Validation helpers for common parameter patterns
export const zPositiveInteger = (fieldName: string) =>
  z
    .number()
    .int()
    .positive()
    .describe(
      `Positive integer identifier for ${fieldName}. Must be greater than 0. Used to uniquely identify records in the API system.`
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
