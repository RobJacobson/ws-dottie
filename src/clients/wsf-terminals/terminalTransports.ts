import { z } from "zod";
import { terminalTransportsArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalTransports */
const getTerminalTransportsParamsSchema = z.object({});

/** GetTerminalTransports params type */

/** Endpoint definition for getTerminalTransports */
export const getTerminalTransportsDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalTransports",
  endpoint: "/ferries/api/terminals/rest/terminaltransports",
  inputSchema: getTerminalTransportsParamsSchema,
  outputSchema: terminalTransportsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
