import { z } from "zod";
import { terminalSailingSpaceSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalSailingSpaceByTerminalId */
const getTerminalSailingSpaceByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalSailingSpaceByTerminalId params type */

/** Endpoint definition for getTerminalSailingSpaceByTerminalId */
export const getTerminalSailingSpaceByTerminalIdDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalSailingSpaceByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}",
  inputSchema: getTerminalSailingSpaceByTerminalIdParamsSchema,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
