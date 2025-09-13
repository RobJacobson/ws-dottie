import { z } from "zod";
import { terminalSailingSpacesSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalSailingSpace */
const terminalSailingSpaceInput = z.object({});

/** Endpoint metadata for getTerminalSailingSpace */
export const getTerminalSailingSpaceMeta = {
  api: "wsf-terminals",
  function: "getTerminalSailingSpace",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
  inputSchema: terminalSailingSpaceInput,
  outputSchema: terminalSailingSpacesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceInput
>;
