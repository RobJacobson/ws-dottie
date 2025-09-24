import { z } from "zod";

import {
  type TerminalBasics,
  terminalBasicsSchema,
} from "@/schemas/wsf-terminals/terminalBasics.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalBasicsByTerminalId */
const terminalBasicsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalBasicsByTerminalId */
export const getTerminalBasicsByTerminalIdMeta: EndpointDefinition<
  TerminalBasicsByTerminalIdInput,
  TerminalBasics
> = {
  id: "wsf-terminals:terminalBasicsById",
  endpoint: "/ferries/api/terminals/rest/terminalbasics/{terminalId}",
  inputSchema: terminalBasicsByTerminalIdInput,
  outputSchema: terminalBasicsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalBasicsByTerminalIdInput = z.infer<
  typeof terminalBasicsByTerminalIdInput
>;
