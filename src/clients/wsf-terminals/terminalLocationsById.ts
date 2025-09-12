import { z } from "zod";
import { terminalLocationSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalLocationsByTerminalId */
const getTerminalLocationsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalLocationsByTerminalId params type */

/** Endpoint definition for getTerminalLocationsByTerminalId */
export const getTerminalLocationsByTerminalIdDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalLocationsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminallocations/{terminalId}",
  inputSchema: getTerminalLocationsByTerminalIdParamsSchema,
  outputSchema: terminalLocationSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
