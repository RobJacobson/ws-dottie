import { z } from "zod";
import {
  terminalLocationsSchema,
  type TerminalLocation,
} from "@/schemas/wsf-terminals/terminalLocation.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalLocations */
const terminalLocationsInput = z.object({});

/** Endpoint metadata for getTerminalLocations */
export const getTerminalLocationsMeta: Endpoint<
  TerminalLocationsInput,
  TerminalLocation[]
> = {
  api: "wsf-terminals",
  function: "getTerminalLocations",
  endpoint: "/ferries/api/terminals/rest/terminallocations",
  inputSchema: terminalLocationsInput,
  outputSchema: terminalLocationsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalLocationsInput = z.infer<typeof terminalLocationsInput>;
