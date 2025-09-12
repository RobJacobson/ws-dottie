import { z } from "zod";
import { terminalTransportsSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalTransportsByTerminalId */
const getTerminalTransportsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalTransportsByTerminalId params type */

/** Endpoint definition for getTerminalTransportsByTerminalId */
export const getTerminalTransportsByTerminalIdDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalTransportsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminaltransports/{terminalId}",
  inputSchema: getTerminalTransportsByTerminalIdParamsSchema,
  outputSchema: terminalTransportsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
