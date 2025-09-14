import { z } from "zod";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getTerminalSailingSpaceByTerminalId */
const terminalSailingSpaceByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalSailingSpaceByTerminalId */
export const getTerminalSailingSpaceByTerminalIdMeta: EndpointMeta<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
> = {
  id: "wsf-terminals/terminalSailingSpaceById",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}",
  inputSchema: terminalSailingSpaceByTerminalIdInput,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalSailingSpaceByTerminalIdInput = z.infer<
  typeof terminalSailingSpaceByTerminalIdInput
>;
