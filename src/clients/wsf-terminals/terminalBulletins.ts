import { z } from "zod";
import { terminalBulletinsArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalBulletins */
export const getTerminalBulletinsParamsSchema = z.object({});

/** GetTerminalBulletins params type */
export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

/** Endpoint definition for getTerminalBulletins */
export const getTerminalBulletinsDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalBulletins",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins",
  inputSchema: getTerminalBulletinsParamsSchema,
  outputSchema: terminalBulletinsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
