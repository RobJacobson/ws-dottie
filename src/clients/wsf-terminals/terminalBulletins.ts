import { z } from "zod";
import { terminalBulletinssSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalBulletins */
const terminalBulletinsInput = z.object({});

/** Endpoint metadata for getTerminalBulletins */
export const getTerminalBulletinsMeta = {
  api: "wsf-terminals",
  function: "getTerminalBulletins",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins",
  inputSchema: terminalBulletinsInput,
  outputSchema: terminalBulletinssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalBulletinsInput = z.infer<typeof terminalBulletinsInput>;
