import { z } from "zod";
import { terminalBulletinsSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalBulletinsByTerminalId */
export const getTerminalBulletinsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalBulletinsByTerminalId params type */
export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;

/** Endpoint definition for getTerminalBulletinsByTerminalId */
export const getTerminalBulletinsByTerminalIdDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalBulletinsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins/{terminalId}",
  inputSchema: getTerminalBulletinsByTerminalIdParamsSchema,
  outputSchema: terminalBulletinsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
