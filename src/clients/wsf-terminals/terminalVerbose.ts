import { z } from "zod";
import { terminalVerboseArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalVerbose */
const getTerminalVerboseParamsSchema = z.object({});

/** GetTerminalVerbose params type */

/** Endpoint definition for getTerminalVerbose */
export const getTerminalVerboseDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalVerbose",
  endpoint: "/ferries/api/terminals/rest/terminalverbose",
  inputSchema: getTerminalVerboseParamsSchema,
  outputSchema: terminalVerboseArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
