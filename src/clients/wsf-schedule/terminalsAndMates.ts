import { z } from "zod";
import { terminalsAndMatesSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMates */
const terminalsAndMatesInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getTerminalsAndMates */
export const getTerminalsAndMatesMeta = {
  api: "wsf-schedule",
  function: "getTerminalsAndMates",
  endpoint: "/ferries/api/schedule/rest/terminalsandmates/{tripDate}",
  inputSchema: terminalsAndMatesInput,
  outputSchema: terminalsAndMatesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type TerminalsAndMatesInput = z.infer<typeof terminalsAndMatesInput>;
