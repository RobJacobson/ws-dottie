import { z } from "zod";

import {
  type TerminalLocation,
  terminalLocationSchema,
} from "@/schemas/wsf-terminals/terminalLocation.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalLocationsByTerminalId */
const terminalLocationsByTerminalIdInput = z.object({
  TerminalID: z.number().int(),
});

/** Endpoint metadata for getTerminalLocationsByTerminalId */
export const getTerminalLocationsByTerminalIdMeta: EndpointDefinition<
  TerminalLocationsByTerminalIdInput,
  TerminalLocation
> = {
  api: "wsf-terminals",
  function: "terminalLocationsById",
  endpoint: "/ferries/api/terminals/rest/terminallocations/{TerminalID}",
  inputSchema: terminalLocationsByTerminalIdInput,
  outputSchema: terminalLocationSchema,
  sampleParams: { TerminalID: 5 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalLocationsByTerminalIdInput = z.infer<
  typeof terminalLocationsByTerminalIdInput
>;
