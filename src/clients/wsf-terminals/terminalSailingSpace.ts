import { z } from "zod";
import { terminalSailingSpaceArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalSailingSpace */
const getTerminalSailingSpaceParamsSchema = z.object({});

/** GetTerminalSailingSpace params type */

/** Endpoint definition for getTerminalSailingSpace */
export const getTerminalSailingSpaceDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalSailingSpace",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
  inputSchema: getTerminalSailingSpaceParamsSchema,
  outputSchema: terminalSailingSpaceArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
