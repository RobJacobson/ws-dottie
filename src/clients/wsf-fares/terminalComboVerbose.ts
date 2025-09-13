import { z } from "zod";
import { terminalComboVerboseItemSchema } from "@/schemas/wsf-fares";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalComboVerbose */
const terminalComboVerboseInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getTerminalComboVerbose */
export const getTerminalComboVerboseMeta = {
  api: "wsf-fares",
  function: "getTerminalComboVerbose",
  endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}",
  inputSchema: terminalComboVerboseInput,
  outputSchema: z.array(terminalComboVerboseItemSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type FaresTerminalComboVerboseInput = z.infer<
  typeof terminalComboVerboseInput
>;
