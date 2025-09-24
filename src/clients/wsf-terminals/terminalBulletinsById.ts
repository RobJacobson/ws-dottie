import { z } from "zod";

import {
  type TerminalBulletins,
  terminalBulletinsSchema,
} from "@/schemas/wsf-terminals/terminalBulletins.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalBulletinsByTerminalId */
const terminalBulletinsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalBulletinsByTerminalId */
export const getTerminalBulletinsByTerminalIdMeta: EndpointDefinition<
  TerminalBulletinsByTerminalIdInput,
  TerminalBulletins
> = {
  id: "wsf-terminals:terminalBulletinsById",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins/{terminalId}",
  inputSchema: terminalBulletinsByTerminalIdInput,
  outputSchema: terminalBulletinsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalBulletinsByTerminalIdInput = z.infer<
  typeof terminalBulletinsByTerminalIdInput
>;
