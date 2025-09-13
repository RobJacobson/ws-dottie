import { z } from "zod";
import type { TerminalSailingSpace } from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import { terminalSailingSpaceSchema } from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalSailingSpace */
const terminalSailingSpaceInput = z.object({});

/** Endpoint metadata for getTerminalSailingSpace */
export const getTerminalSailingSpaceMeta: Endpoint<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
> = {
  api: "wsf-terminals",
  function: "getTerminalSailingSpace",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
  inputSchema: terminalSailingSpaceInput,
  outputSchema: z.array(terminalSailingSpaceSchema),
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceInput
>;
