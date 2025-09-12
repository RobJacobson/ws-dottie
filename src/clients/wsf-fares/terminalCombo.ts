import { z } from "zod";
import { scheduleTerminalComboSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getFaresTerminalCombo */
const getFaresTerminalComboParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

/** GetFaresTerminalCombo params type */

/** Endpoint definition for getFaresTerminalCombo */
export const getFaresTerminalComboDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFaresTerminalCombo",
  endpoint:
    "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
  inputSchema: getFaresTerminalComboParamsSchema,
  outputSchema: scheduleTerminalComboSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
});
