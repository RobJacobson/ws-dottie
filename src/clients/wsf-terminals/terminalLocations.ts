import { z } from "zod";
import {
  type TerminalLocation,
  terminalLocationsSchema,
} from "@/schemas/wsf-terminals/terminalLocation.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getTerminalLocations */
const terminalLocationsInput = z.object({});

/** Endpoint metadata for getTerminalLocations */
export const getTerminalLocationsMeta: EndpointMeta<
  TerminalLocationsInput,
  TerminalLocation[]
> = {
  id: "wsf-terminals/terminalLocations",
  endpoint: "/ferries/api/terminals/rest/terminallocations",
  inputSchema: terminalLocationsInput,
  outputSchema: terminalLocationsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalLocationsInput = z.infer<typeof terminalLocationsInput>;
