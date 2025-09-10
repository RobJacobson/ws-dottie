import { z } from "zod";
import { terminalMateSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getFaresTerminalMates */
export const getFaresTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

/** GetFaresTerminalMates params type */
export type GetFaresTerminalMatesParams = z.infer<
  typeof getFaresTerminalMatesParamsSchema
>;

/** Endpoint definition for getFaresTerminalMates */
export const getFaresTerminalMatesDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFaresTerminalMates",
  endpoint: "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: getFaresTerminalMatesParamsSchema,
  outputSchema: z.array(terminalMateSchema),
  sampleParams: { tripDate: getSampleDates().tomorrow, terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
