import { z } from "zod";
import {
  type TerminalBulletins,
  terminalBulletinsSchema,
} from "@/schemas/wsf-terminals/terminalBulletins.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalBulletins */
const terminalBulletinsInput = z.object({});

/** Endpoint metadata for getTerminalBulletins */
export const getTerminalBulletinsMeta: Endpoint<
  TerminalBulletinsInput,
  TerminalBulletins
> = {
  endpoint: "/ferries/api/terminals/rest/terminalbulletins",
  inputSchema: terminalBulletinsInput,
  outputSchema: terminalBulletinsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalBulletinsInput = z.infer<typeof terminalBulletinsInput>;
