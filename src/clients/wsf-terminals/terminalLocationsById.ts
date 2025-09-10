import { z } from "zod";
import { terminalLocationSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalLocationsByTerminalId */
export const getTerminalLocationsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

/** GetTerminalLocationsByTerminalId params type */
export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;

/** Endpoint definition for getTerminalLocationsByTerminalId */
export const getTerminalLocationsByTerminalIdDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalLocationsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminallocations/{terminalId}",
  inputSchema: getTerminalLocationsByTerminalIdParamsSchema,
  outputSchema: terminalLocationSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
