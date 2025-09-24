import { z } from "zod";

import {
  type TerminalComboVerboseItem,
  terminalComboVerboseItemSchema,
} from "@/schemas/wsf-fares/terminalComboVerboseItem.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalComboVerbose */
const terminalComboVerboseInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getTerminalComboVerbose */
export const getTerminalComboVerboseMeta: EndpointDefinition<
  FaresTerminalComboVerboseInput,
  TerminalComboVerboseItem[]
> = {
  id: "wsf-fares:terminalComboVerbose",
  endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}",
  inputSchema: terminalComboVerboseInput,
  outputSchema: z.array(terminalComboVerboseItemSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresTerminalComboVerboseInput = z.infer<
  typeof terminalComboVerboseInput
>;
