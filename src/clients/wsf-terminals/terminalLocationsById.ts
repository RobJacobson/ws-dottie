import { z } from "zod";
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "@/schemas/wsf-terminals/terminalLocation.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalLocationsByTerminalId */
const terminalLocationsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalLocationsByTerminalId */
export const getTerminalLocationsByTerminalIdMeta: EndpointDefinition<
  TerminalLocationsByTerminalIdInput,
  TerminalLocation
> = {
  id: "wsf-terminals/terminalLocationsById",
  endpoint: "/ferries/api/terminals/rest/terminallocations/{terminalId}",
  inputSchema: terminalLocationsByTerminalIdInput,
  outputSchema: terminalLocationSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalLocationsByTerminalIdInput = z.infer<
  typeof terminalLocationsByTerminalIdInput
>;
