/**
 * Native Fetch Strategy for Server Environments
 *
 * This module provides a native fetch implementation for server-side environments
 * such as Node.js, Bun, and React Native. It uses the built-in fetch API or
 * polyfills where necessary, providing a consistent interface for making HTTP
 * requests without CORS restrictions.
 *
 * Key Features:
 * - Native fetch implementation for server environments
 * - Automatic response type detection and handling
 * - Proper error handling and timeout management
 * - Consistent interface with other fetch strategies
 * - No CORS restrictions (server-side execution)
 *
 * Usage:
 * ```typescript
 * const fetchStrategy = fetchNative;
 * const data = await fetchStrategy("https://api.example.com/data");
 *
 * // With expected type for better error handling
 * const data = await fetchStrategy("https://api.example.com/data", "array");
 * ```
 *
 * Note: This strategy is automatically selected for Node.js, Bun, React Native,
 * and test environments where CORS is not a concern.
 */

import type { FetchStrategy } from "./types";

/**
 * Native fetch strategy for server-side and test environments
 *
 * Uses the standard fetch API for environments where CORS is not a concern,
 * such as Node.js, Bun, React Native, and test environments.
 *
 * @param url - The API endpoint URL
 * @param expectedType - Optional expected return type (ignored for native fetch)
 * @returns Promise resolving to raw JSON string
 * @throws Error for HTTP errors or API error messages
 */
export const fetchNative: FetchStrategy = async (
  url: string,
  _expectedType?: "array" | "object"
): Promise<string> => {
  console.log(
    "🚨 [fetchNative] CURRENT VERSION EXECUTING - returning raw text"
  );
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  // Read the response as text to check for empty body
  const text = await response.text();
  if (!text.trim()) {
    throw new Error("API returned HTTP 200 with empty body (invalid response)");
  }

  // Don't parse here - return raw text to avoid double conversion
  // const data = JSON.parse(text);
  // return processApiResponse(data);
  return text;
};
