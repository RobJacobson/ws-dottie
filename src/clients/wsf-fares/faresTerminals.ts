import { z } from "zod";
import { faresTerminalSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getFaresTerminals */
export const getFaresTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetFaresTerminals params type */
export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

/** Endpoint definition for getFaresTerminals */
export const getFaresTerminalsDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFaresTerminals",
  endpoint: "/ferries/api/fares/rest/terminals/{tripDate}",
  inputSchema: getFaresTerminalsParamsSchema,
  outputSchema: z.array(faresTerminalSchema),
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
