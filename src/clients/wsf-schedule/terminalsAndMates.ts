import { z } from "zod";

import {
  type TerminalsAndMates,
  terminalsAndMatesSchema,
} from "@/schemas/wsf-schedule/terminalsAndMates.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMates */
const terminalsAndMatesInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getTerminalsAndMates */
export const getTerminalsAndMatesMeta: EndpointDefinition<
  TerminalsAndMatesInput,
  TerminalsAndMates
> = {
  api: "wsf-schedule",
  function: "terminalsAndMates",
  endpoint: "/ferries/api/schedule/rest/terminalsandmates/{TripDate}",
  inputSchema: terminalsAndMatesInput,
  outputSchema: terminalsAndMatesSchema,
  sampleParams: { TripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalsAndMatesInput = z.infer<typeof terminalsAndMatesInput>;
