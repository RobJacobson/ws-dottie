import { z } from "zod";
import { terminalWaitTimesSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalWaitTimesByTerminalId */
const getTerminalWaitTimesByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalWaitTimesByTerminalId params type */

/** Endpoint definition for getTerminalWaitTimesByTerminalId */
export const getTerminalWaitTimesByTerminalIdDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalWaitTimesByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}",
  inputSchema: getTerminalWaitTimesByTerminalIdParamsSchema,
  outputSchema: terminalWaitTimesSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
