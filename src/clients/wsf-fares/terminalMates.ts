import { z } from "zod";
import { terminalMateSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getFaresTerminalMates */
const getFaresTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

/** GetFaresTerminalMates params type */

/** Endpoint definition for getFaresTerminalMates */
export const getFaresTerminalMatesDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFaresTerminalMates",
  endpoint: "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: getFaresTerminalMatesParamsSchema,
  outputSchema: z.array(terminalMateSchema),
  sampleParams: { tripDate: datesHelper.tomorrow(), terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
