import { z } from "zod";
import { terminalWaitTimesArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalWaitTimes */
const getTerminalWaitTimesParamsSchema = z.object({});

/** GetTerminalWaitTimes params type */

/** Endpoint definition for getTerminalWaitTimes */
export const getTerminalWaitTimesDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalWaitTimes",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes",
  inputSchema: getTerminalWaitTimesParamsSchema,
  outputSchema: terminalWaitTimesArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
