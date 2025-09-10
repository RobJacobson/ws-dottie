import { z } from "zod";
import { terminalSailingSpaceArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalSailingSpace */
export const getTerminalSailingSpaceParamsSchema = z.object({});

/** GetTerminalSailingSpace params type */
export type GetTerminalSailingSpaceParams = z.infer<
  typeof getTerminalSailingSpaceParamsSchema
>;

/** Endpoint definition for getTerminalSailingSpace */
export const getTerminalSailingSpaceDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalSailingSpace",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
  inputSchema: getTerminalSailingSpaceParamsSchema,
  outputSchema: terminalSailingSpaceArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
