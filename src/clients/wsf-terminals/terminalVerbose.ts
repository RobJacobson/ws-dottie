import { z } from "zod";
import { terminalVerboseArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalVerbose */
export const getTerminalVerboseParamsSchema = z.object({});

/** GetTerminalVerbose params type */
export type GetTerminalVerboseParams = z.infer<
  typeof getTerminalVerboseParamsSchema
>;

/** Endpoint definition for getTerminalVerbose */
export const getTerminalVerboseDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalVerbose",
  endpoint: "/ferries/api/terminals/rest/terminalverbose",
  inputSchema: getTerminalVerboseParamsSchema,
  outputSchema: terminalVerboseArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
