import { z } from "zod";
import { terminalLocationArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalLocations */
export const getTerminalLocationsParamsSchema = z.object({});

/** GetTerminalLocations params type */
export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

/** Endpoint definition for getTerminalLocations */
export const getTerminalLocationsDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getTerminalLocations",
  endpoint: "/ferries/api/terminals/rest/terminallocations",
  inputSchema: getTerminalLocationsParamsSchema,
  outputSchema: terminalLocationArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
