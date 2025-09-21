/**
 * @fileoverview Data Integrity Concern (module)
 */

import type { Endpoint } from "@/shared/endpoints";
import { createDataIntegrityTest } from "../shared/dataIntegrity";

export async function runDataIntegrity(
  endpoint: Endpoint<unknown, unknown>
): Promise<{ success: boolean; message: string }> {
  const params = endpoint.sampleParams || {};
  const integrity = createDataIntegrityTest(endpoint);
  const result = await integrity.test(params);
  return { success: result.success, message: result.message };
}
