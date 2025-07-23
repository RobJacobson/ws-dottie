// Native fetch strategy for server-side and test environments
//
// This module implements the standard fetch API for environments where CORS is not
// a concern, such as Node.js, Bun, React Native, and test environments.

import type { FetchStrategy } from "./types";
import { processApiResponse } from "./utils";

/**
 * Native fetch strategy for server-side and test environments
 *
 * Uses the standard fetch API for environments where CORS is not a concern,
 * such as Node.js, Bun, React Native, and test environments.
 *
 * @param url - The API endpoint URL
 * @returns Promise resolving to raw JSON string
 * @throws Error for HTTP errors or API error messages
 */
export const fetchNative: FetchStrategy = async (
  url: string
): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return processApiResponse(data);
};
