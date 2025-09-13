import { z } from "zod";
import { terminalSailingSpacesSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTerminalSailingSpace */
const terminalSailingSpaceInput = z.object({});

/** Endpoint metadata for getTerminalSailingSpace */
export const getTerminalSailingSpaceMeta = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalSailingSpace",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
  inputSchema: terminalSailingSpaceInput,
  outputSchema: terminalSailingSpacesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceInput
>;
