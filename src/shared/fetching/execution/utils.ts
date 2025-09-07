/**
 * @fileoverview Utility functions for execution strategies
 *
 * This module provides utility functions used by the execution strategies,
 * including API response processing and error detection.
 */

import type { ApiErrorResponse } from "../types";

/**
 * Processes API response data and returns it as a JSON string
 *
 * Handles API error responses and converts data to JSON string format.
 * This function is used by both JSONP and native fetch strategies.
 *
 * @param data - The raw data from the API response
 * @returns JSON string representation of the data
 * @throws Error if the data contains an API error response
 */
export const processApiResponse = (data: unknown): string => {
  // Check if this is an API error response
  if (isApiErrorResponse(data)) {
    // Create error with the API message for pipeline error handler to process
    const error = new Error(data.Message);
    (error as Error & { apiError?: boolean }).apiError = true;
    throw error;
  }

  // Return the data as JSON string
  return JSON.stringify(data);
};

/**
 * Type guard to check if the response is an API error
 *
 * @param data - The data to check
 * @returns True if the data is an API error response
 */
const isApiErrorResponse = (data: unknown): data is ApiErrorResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "Message" in data &&
    typeof (data as ApiErrorResponse).Message === "string"
  );
};
