import { z } from "zod";
import { terminalBulletinsSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalBulletinsByTerminalId */
const getTerminalBulletinsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalBulletinsByTerminalId params type */

/** Endpoint definition for getTerminalBulletinsByTerminalId */
export const getTerminalBulletinsByTerminalIdDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalBulletinsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins/{terminalId}",
  inputSchema: getTerminalBulletinsByTerminalIdParamsSchema,
  outputSchema: terminalBulletinsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
