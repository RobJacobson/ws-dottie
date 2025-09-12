import { z } from "zod";
import { faresTerminalSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getFaresTerminals */
const getFaresTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetFaresTerminals params type */

/** Endpoint definition for getFaresTerminals */
export const getFaresTerminalsDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFaresTerminals",
  endpoint: "/ferries/api/fares/rest/terminals/{tripDate}",
  inputSchema: getFaresTerminalsParamsSchema,
  outputSchema: z.array(faresTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
