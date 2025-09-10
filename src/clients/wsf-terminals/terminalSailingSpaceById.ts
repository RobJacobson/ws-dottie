import { z } from "zod";
import { terminalSailingSpaceSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalSailingSpaceByTerminalId */
export const getTerminalSailingSpaceByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalSailingSpaceByTerminalId params type */
export type GetTerminalSailingSpaceByTerminalIdParams = z.infer<
  typeof getTerminalSailingSpaceByTerminalIdParamsSchema
>;

/** Endpoint definition for getTerminalSailingSpaceByTerminalId */
export const getTerminalSailingSpaceByTerminalIdDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalSailingSpaceByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}",
  inputSchema: getTerminalSailingSpaceByTerminalIdParamsSchema,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
