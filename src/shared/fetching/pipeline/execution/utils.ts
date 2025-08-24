/**
 * Utility functions for execution strategies
 */

import type { ApiErrorResponse } from "./types";

/**
 * Processes API response data and returns it as a JSON string
 *
 * @param data - The raw data from the API response
 * @returns JSON string representation of the data
 * @throws Error if the data contains an API error response
 */
export const processApiResponse = (data: unknown): string => {
  // Check if this is an API error response
  if (isApiErrorResponse(data)) {
    throw new Error(`API Error: ${data.Message}`);
  }

  // Return the data as JSON string
  return JSON.stringify(data);
};

/**
 * Type guard to check if the response is an API error
 */
const isApiErrorResponse = (data: unknown): data is ApiErrorResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "Message" in data &&
    typeof (data as ApiErrorResponse).Message === "string"
  );
};
