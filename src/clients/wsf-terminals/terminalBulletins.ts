import { z } from "zod";
import {
  terminalBulletinsSchema,
  type TerminalBulletins,
} from "@/schemas/wsf-terminals/terminalBulletins.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalBulletins */
const terminalBulletinsInput = z.object({});

/** Endpoint metadata for getTerminalBulletins */
export const getTerminalBulletinsMeta: Endpoint<
  TerminalBulletinsInput,
  TerminalBulletins
> = {
  api: "wsf-terminals",
  function: "getTerminalBulletins",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins",
  inputSchema: terminalBulletinsInput,
  outputSchema: terminalBulletinsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalBulletinsInput = z.infer<typeof terminalBulletinsInput>;
