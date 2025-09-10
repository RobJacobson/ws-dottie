import { z } from "zod";
import { terminalWaitTimesArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalWaitTimes */
export const getTerminalWaitTimesParamsSchema = z.object({});

/** GetTerminalWaitTimes params type */
export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

/** Endpoint definition for getTerminalWaitTimes */
export const getTerminalWaitTimesDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalWaitTimes",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes",
  inputSchema: getTerminalWaitTimesParamsSchema,
  outputSchema: terminalWaitTimesArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
