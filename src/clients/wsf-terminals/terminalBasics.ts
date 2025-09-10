import { z } from "zod";
import { terminalBasicsArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalBasics */
export const getTerminalBasicsParamsSchema = z.object({});

/** GetTerminalBasics params type */
export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

/** Endpoint definition for getTerminalBasics */
export const getTerminalBasicsDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalBasics",
  endpoint: "/ferries/api/terminals/rest/terminalbasics",
  inputSchema: getTerminalBasicsParamsSchema,
  outputSchema: terminalBasicsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
