/**
 * @fileoverview Invalid Parameters Concern (module)
 */

import { fetchZod } from "@/shared/fetching";
import type { Endpoint } from "@/shared/endpoints";

export async function runInvalidParameters(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  try {
    const invalidParams = { id: "not-a-number" } as unknown as Record<
      string,
      unknown
    >;
    await fetchZod(
      endpoint as unknown as Endpoint<Record<string, unknown>, unknown>,
      invalidParams,
      "none"
    );
    return {
      success: false,
      message: "No error thrown for invalid parameter types",
    };
  } catch (_error) {
    return {
      success: true,
      message: "Correctly handled invalid params",
    };
  }
}
