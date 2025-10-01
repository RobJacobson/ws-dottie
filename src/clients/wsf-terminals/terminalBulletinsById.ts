import { z } from "zod";

import {
  type TerminalBulletins,
  terminalBulletinsSchema,
} from "@/schemas/wsf-terminals/terminalBulletins.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalBulletinsByTerminalId */
const terminalBulletinsByTerminalIdInput = z.object({
  TerminalID: z.number().int(),
});

/** Endpoint metadata for getTerminalBulletinsByTerminalId */
export const getTerminalBulletinsByTerminalIdMeta: EndpointDefinition<
  TerminalBulletinsByTerminalIdInput,
  TerminalBulletins
> = {
  api: "wsf-terminals",
  function: "terminalBulletinsById",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins/{TerminalID}",
  inputSchema: terminalBulletinsByTerminalIdInput,
  outputSchema: terminalBulletinsSchema,
  sampleParams: { TerminalID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalBulletinsByTerminalIdInput = z.infer<
  typeof terminalBulletinsByTerminalIdInput
>;
