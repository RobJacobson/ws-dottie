import { z } from "zod";
import { terminalBasicsSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalBasicsByTerminalId */
export const getTerminalBasicsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalBasicsByTerminalId params type */
export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof getTerminalBasicsByTerminalIdParamsSchema
>;

/** Endpoint definition for getTerminalBasicsByTerminalId */
export const getTerminalBasicsByTerminalIdDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalBasicsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalbasics/{terminalId}",
  inputSchema: getTerminalBasicsByTerminalIdParamsSchema,
  outputSchema: terminalBasicsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
