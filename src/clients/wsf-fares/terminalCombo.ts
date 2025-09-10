import { z } from "zod";
import { scheduleTerminalComboSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getFaresTerminalCombo */
export const getFaresTerminalComboParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

/** GetFaresTerminalCombo params type */
export type GetFaresTerminalComboParams = z.infer<
  typeof getFaresTerminalComboParamsSchema
>;

/** Endpoint definition for getFaresTerminalCombo */
export const getFaresTerminalComboDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFaresTerminalCombo",
  endpoint:
    "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
  inputSchema: getFaresTerminalComboParamsSchema,
  outputSchema: scheduleTerminalComboSchema,
  sampleParams: {
    tripDate: getSampleDates().tomorrow,
    departingTerminalId: 1,
    arrivingTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
});
