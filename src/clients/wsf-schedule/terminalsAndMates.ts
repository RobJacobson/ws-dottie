import { z } from "zod";
import { terminalsAndMatesSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getTerminalsAndMates */
export const getTerminalsAndMatesParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetTerminalsAndMates params type */
export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

/** Endpoint definition for getTerminalsAndMates */
export const getTerminalsAndMatesDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getTerminalsAndMates",
  endpoint: "/ferries/api/schedule/rest/terminalsandmates/{tripDate}",
  inputSchema: getTerminalsAndMatesParamsSchema,
  outputSchema: terminalsAndMatesSchema,
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
