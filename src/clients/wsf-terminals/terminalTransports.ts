import { z } from "zod";
import { terminalTransportsArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalTransports */
export const getTerminalTransportsParamsSchema = z.object({});

/** GetTerminalTransports params type */
export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

/** Endpoint definition for getTerminalTransports */
export const getTerminalTransportsDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalTransports",
  endpoint: "/ferries/api/terminals/rest/terminaltransports",
  inputSchema: getTerminalTransportsParamsSchema,
  outputSchema: terminalTransportsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
