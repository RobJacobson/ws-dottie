import { z } from "zod";
import { terminalTransportsSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalTransportsByTerminalId */
export const getTerminalTransportsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalTransportsByTerminalId params type */
export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

/** Endpoint definition for getTerminalTransportsByTerminalId */
export const getTerminalTransportsByTerminalIdDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalTransportsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminaltransports/{terminalId}",
  inputSchema: getTerminalTransportsByTerminalIdParamsSchema,
  outputSchema: terminalTransportsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
