import { z } from "zod";

import {
  type TerminalBulletinsList,
  terminalBulletinsListSchema,
} from "@/schemas/wsf-terminals/terminalBulletins.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalBulletins */
const terminalBulletinsInput = z.object({}).strict();

/** Endpoint metadata for getTerminalBulletins */
export const getTerminalBulletinsMeta: EndpointDefinition<
  TerminalBulletinsInput,
  TerminalBulletinsList
> = {
  id: "wsf-terminals/terminalBulletins",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins",
  inputSchema: terminalBulletinsInput,
  outputSchema: terminalBulletinsListSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalBulletinsInput = z.infer<typeof terminalBulletinsInput>;
