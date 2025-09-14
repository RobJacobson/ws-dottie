/**
 * @fileoverview URL Building utilities for API requests
 *
 * This module provides utilities for building complete API URLs from templates,
 * handling parameter interpolation, and adding authentication parameters.
 */

import { configManager } from "../utils/configManager";
import { jsDateToYyyyMmDd } from "../utils/dateUtils";

/**
 * Builds a complete API URL from a template and parameters
 *
 * This function takes a URL template (with domain already included) and interpolates
 * parameters into placeholders, then adds the appropriate API key parameter.
 *
 * @template T - The parameters type
 * @param urlTemplate - Complete URL template with domain (e.g., "https://www.wsdot.wa.gov/Ferries/API/Fares/rest/farelineitems/{TRIPDATE}/{DEPARTINGTERMINALID}")
 * @param params - Parameters to interpolate into the template
 * @param inputSchema - Optional Zod schema for parameter validation
 * @returns Complete URL ready for API request
 * @throws Error if required parameters are missing or validation fails
 *
 * @example
 * ```typescript
 * const url = buildApiUrl(
 *   "https://www.wsdot.wa.gov/Ferries/API/Fares/rest/farelineitems/{TRIPDATE}/{DEPARTINGTERMINALID}",
 *   { TRIPDATE: new Date('2024-01-15'), DEPARTINGTERMINALID: 7 },
 *   fareParamsSchema
 * );
 * // Result: "https://www.wsdot.wa.gov/Ferries/API/Fares/rest/farelineitems/2024-01-15/7?apiaccesscode=YOUR_API_KEY"
 * ```
 */
export const buildApiUrl = <T>(
  urlTemplate: string,
  params: T,
  inputSchema?: import("zod").ZodType<T>
): string => {
  // Validate inputs if schema provided
  const validatedParams = inputSchema ? inputSchema.parse(params) : params;

  // Interpolate parameters into the URL template
  let interpolatedUrl = urlTemplate;
  if (validatedParams && typeof validatedParams === "object") {
    Object.entries(validatedParams as Record<string, unknown>).forEach(
      ([key, value]) => {
        const placeholder = `{${key}}`;
        if (interpolatedUrl.includes(placeholder)) {
          // Format dates and convert to string
          const stringValue =
            value instanceof Date
              ? jsDateToYyyyMmDd(value) // YYYY-MM-DD format
              : String(value);
          interpolatedUrl = interpolatedUrl.replace(placeholder, stringValue);
        }
      }
    );
  }

  // Add API key
  const apiKey = configManager.getApiKey();
  const apiKeyParam = urlTemplate.includes("/ferries/")
    ? "apiaccesscode"
    : "AccessCode";
  const separator = interpolatedUrl.includes("?") ? "&" : "?";
  return `${interpolatedUrl}${separator}${apiKeyParam}=${apiKey}`;
};
