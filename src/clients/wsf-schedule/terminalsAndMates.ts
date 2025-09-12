import { z } from "zod";
import { terminalsAndMatesSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getTerminalsAndMates */
const getTerminalsAndMatesParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetTerminalsAndMates params type */

/** Endpoint definition for getTerminalsAndMates */
export const getTerminalsAndMatesDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getTerminalsAndMates",
  endpoint: "/ferries/api/schedule/rest/terminalsandmates/{tripDate}",
  inputSchema: getTerminalsAndMatesParamsSchema,
  outputSchema: terminalsAndMatesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
