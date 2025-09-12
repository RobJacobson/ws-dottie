import { z } from "zod";
import { terminalVerboseSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalVerboseByTerminalId */
const getTerminalVerboseByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalVerboseByTerminalId params type */

/** Endpoint definition for getTerminalVerboseByTerminalId */
export const getTerminalVerboseByTerminalIdDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalVerboseByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalverbose/{terminalId}",
  inputSchema: getTerminalVerboseByTerminalIdParamsSchema,
  outputSchema: terminalVerboseSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
