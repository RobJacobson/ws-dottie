import { z } from "zod";
import type { TerminalSailingSpace } from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import { terminalSailingSpaceSchema } from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getTerminalSailingSpace */
const terminalSailingSpaceInput = z.object({});

/** Endpoint metadata for getTerminalSailingSpace */
export const getTerminalSailingSpaceMeta: EndpointMeta<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
> = {
  id: "wsf-terminals/terminalSailingSpace",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
  inputSchema: terminalSailingSpaceInput,
  outputSchema: z.array(terminalSailingSpaceSchema),
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceInput
>;
