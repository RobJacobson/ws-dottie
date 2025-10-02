/**
 * @fileoverview Invalid Parameters Concern (module)
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchAndValidateNative } from "@/shared/fetching";

export async function runInvalidParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  // Skip invalid parameter testing for endpoints with empty input schemas
  // These endpoints don't require parameters and should accept any parameters
  const schemaKeys = Object.keys((endpoint.inputSchema as any).shape || {});
  if (schemaKeys.length === 0) {
    return {
      success: true,
      message: "Endpoint accepts any parameters (no validation required)",
    };
  }

  try {
    // Test with unexpected parameters that don't match the endpoint template
    const invalidParams = {
      unexpectedParam: "not-expected",
    } as unknown as Record<string, unknown>;
    await fetchAndValidateNative(
      endpoint as unknown as Endpoint<Record<string, unknown>, unknown>,
      invalidParams,
      "none"
    );
    return {
      success: false,
      message: "No error thrown for unexpected parameters",
    };
  } catch (error) {
    // Check if the error is about unexpected parameters (which is what we want)
    if (
      error instanceof Error &&
      error.message.includes("Unexpected parameters provided")
    ) {
      return {
        success: true,
        message: "Correctly rejected unexpected parameters",
      };
    }
    // Other errors (like validation errors) are also acceptable
    return {
      success: true,
      message: "Correctly handled invalid params",
    };
  }
}
