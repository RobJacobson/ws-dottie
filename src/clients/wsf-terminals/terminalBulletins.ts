import { z } from "zod";
import { terminalBulletinsArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalBulletins */
const getTerminalBulletinsParamsSchema = z.object({});

/** GetTerminalBulletins params type */

/** Endpoint definition for getTerminalBulletins */
export const getTerminalBulletinsDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalBulletins",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins",
  inputSchema: getTerminalBulletinsParamsSchema,
  outputSchema: terminalBulletinsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
