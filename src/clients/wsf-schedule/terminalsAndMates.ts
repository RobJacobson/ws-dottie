import { z } from "zod";
import { terminalsAndMatesSchema, type TerminalsAndMates } from "@/schemas/wsf-schedule/terminalsAndMates.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMates */
const terminalsAndMatesInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getTerminalsAndMates */
export const getTerminalsAndMatesMeta: Endpoint<
  TerminalsAndMatesInput,
  TerminalsAndMates
> = {
  api: "wsf-schedule",
  function: "getTerminalsAndMates",
  endpoint: "/ferries/api/schedule/rest/terminalsandmates/{tripDate}",
  inputSchema: terminalsAndMatesInput,
  outputSchema: terminalsAndMatesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalsAndMatesInput = z.infer<typeof terminalsAndMatesInput>;
