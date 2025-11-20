/**
 * @fileoverview Robust JSON Parsing with Fallback Mechanisms
 *
 * This module provides a robust JSON parsing utility that attempts multiple
 * parsing strategies to handle various JSON formats and potential issues
 * from WSDOT API responses. It includes fallback mechanisms for standard JSON,
 * JSON5-compatible syntax, and severely malformed JSON.
 */

import JSON5 from "json5";
import { jsonrepair } from "jsonrepair";

/**
 * Robust JSON parsing with fallback mechanisms
 *
 * This function attempts to parse JSON input using multiple strategies:
 * 1. Try standard JSON.parse (fastest for valid JSON)
 * 2. Try json5.parse (handles JSON5 syntax like comments, trailing commas)
 * 3. Try jsonrepair + JSON.parse (handles malformed JSON with unescaped quotes)
 *
 * @param input - The JSON string to parse
 * @returns The parsed JavaScript value or object (type: unknown)
 * @throws The original JSON.parse error if all parsing attempts fail
 */
export const parseJsonWithFallback = (input: string): unknown => {
  try {
    return JSON.parse(input);
  } catch (jsonError) {
    try {
      const result = JSON5.parse(input);
      // Check if JSON5 parsed it as a string literal (which happens with invalid JSON)
      if (typeof result === "string" && result === input) {
        throw jsonError; // Throw the original error
      }
      return result;
    } catch (json5Error) {
      try {
        const repaired = jsonrepair(input);
        const parsed = JSON.parse(repaired);
        // Check if jsonrepair just wrapped the input in quotes (making it a string)
        if (typeof parsed === "string" && parsed === input) {
          throw jsonError; // Throw the original error
        }
        return parsed;
      } catch (repairError) {
        // Throw the original JSON.parse error for consistency
        throw jsonError;
      }
    }
  }
};
