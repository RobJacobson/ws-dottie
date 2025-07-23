import type { ApiErrorResponse } from "./types";

/**
 * Checks if the API response contains an error message
 *
 * WSDOT and WSF APIs return error messages in a "Message" field rather than
 * using HTTP error status codes for some validation errors.
 */
export const hasApiError = (data: unknown): data is ApiErrorResponse => {
  if (!data || typeof data !== "object") return false;

  const errorData = data as ApiErrorResponse;
  if (!("Message" in errorData) || typeof errorData.Message !== "string")
    return false;

  const message = errorData.Message.toLowerCase();
  return (
    message.includes("failed") ||
    message.includes("invalid") ||
    message.includes("not valid") ||
    message.includes("cannot be used") ||
    message.includes("error")
  );
};

/**
 * Processes API response data and handles error checking
 *
 * @param data - The raw response data from the API
 * @returns The JSON string representation of the data
 * @throws Error if the response contains an API error message
 */
export const processApiResponse = (data: unknown): string => {
  if (hasApiError(data)) {
    throw new Error(data.Message);
  }

  return JSON.stringify(data);
};
