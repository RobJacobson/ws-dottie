import { z } from "zod";
import { terminalBasicsArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalBasics */
const getTerminalBasicsParamsSchema = z.object({});

/** GetTerminalBasics params type */

/** Endpoint definition for getTerminalBasics */
export const getTerminalBasicsDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalBasics",
  endpoint: "/ferries/api/terminals/rest/terminalbasics",
  inputSchema: getTerminalBasicsParamsSchema,
  outputSchema: terminalBasicsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
