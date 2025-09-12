import { z } from "zod";
import { terminalLocationArraySchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTerminalLocations */
const getTerminalLocationsParamsSchema = z.object({});

/** GetTerminalLocations params type */

/** Endpoint definition for getTerminalLocations */
export const getTerminalLocationsDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalLocations",
  endpoint: "/ferries/api/terminals/rest/terminallocations",
  inputSchema: getTerminalLocationsParamsSchema,
  outputSchema: terminalLocationArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
