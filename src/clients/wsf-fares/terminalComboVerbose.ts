import { z } from "zod";
import { terminalComboVerboseItemSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getTerminalComboVerbose */
export const getTerminalComboVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetTerminalComboVerbose params type */
export type GetTerminalComboVerboseParams = z.infer<
  typeof getTerminalComboVerboseParamsSchema
>;

/** Endpoint definition for getTerminalComboVerbose */
export const getTerminalComboVerboseDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getTerminalComboVerbose",
  endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}",
  inputSchema: getTerminalComboVerboseParamsSchema,
  outputSchema: z.array(terminalComboVerboseItemSchema),
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
