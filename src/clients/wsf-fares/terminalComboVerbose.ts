import { z } from "zod";
import {
  type TerminalComboVerboseItem,
  terminalComboVerboseItemSchema,
} from "@/schemas/wsf-fares/terminalComboVerboseItem.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalComboVerbose */
const terminalComboVerboseInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getTerminalComboVerbose */
export const getTerminalComboVerboseMeta: EndpointMeta<
  FaresTerminalComboVerboseInput,
  TerminalComboVerboseItem[]
> = {
  id: "wsf-fares/terminalComboVerbose",
  endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}",
  inputSchema: terminalComboVerboseInput,
  outputSchema: z.array(terminalComboVerboseItemSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type FaresTerminalComboVerboseInput = z.infer<
  typeof terminalComboVerboseInput
>;
