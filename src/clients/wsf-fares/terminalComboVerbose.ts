import { z } from "zod";
import { terminalComboVerboseItemSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getTerminalComboVerbose */
const getTerminalComboVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetTerminalComboVerbose params type */

/** Endpoint definition for getTerminalComboVerbose */
export const getTerminalComboVerboseDef = defineEndpoint({
  api: "wsf-fares",
  function: "getTerminalComboVerbose",
  endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}",
  inputSchema: getTerminalComboVerboseParamsSchema,
  outputSchema: z.array(terminalComboVerboseItemSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
