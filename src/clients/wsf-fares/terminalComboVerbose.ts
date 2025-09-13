import { z } from "zod";
import { terminalComboVerboseItemSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalComboVerbose */
const terminalComboVerboseInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getTerminalComboVerbose */
export const getTerminalComboVerboseMeta = defineEndpoint({
  api: "wsf-fares",
  function: "getTerminalComboVerbose",
  endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}",
  inputSchema: terminalComboVerboseInput,
  outputSchema: z.array(terminalComboVerboseItemSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type TerminalComboVerboseInput = z.infer<
  typeof terminalComboVerboseInput
>;
