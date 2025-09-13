import { z } from "zod";
import { terminalLocationsSchema } from "@/schemas/wsf-terminals";
import type { TerminalLocation } from "@/schemas/wsf-terminals/terminalLocation.zod";
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

// Type exports (ONLY input types, NO output types)
export type TerminalLocationsInput = z.infer<typeof terminalLocationsInput>;
