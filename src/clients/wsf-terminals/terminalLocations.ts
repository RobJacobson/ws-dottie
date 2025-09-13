import { z } from "zod";
import { terminalLocationsSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalLocations */
const terminalLocationsInput = z.object({});

/** Endpoint metadata for getTerminalLocations */
export const getTerminalLocationsMeta = {
  api: "wsf-terminals",
  function: "getTerminalLocations",
  endpoint: "/ferries/api/terminals/rest/terminallocations",
  inputSchema: terminalLocationsInput,
  outputSchema: terminalLocationsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalLocationsInput = z.infer<typeof terminalLocationsInput>;
