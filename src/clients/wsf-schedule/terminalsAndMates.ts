import { z } from "zod";

import {
  type TerminalsAndMates,
  terminalsAndMatesSchema,
} from "@/schemas/wsf-schedule/terminalsAndMates.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMates */
const terminalsAndMatesInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getTerminalsAndMates */
export const getTerminalsAndMatesMeta: EndpointDefinition<
  TerminalsAndMatesInput,
  TerminalsAndMates
> = {
  id: "wsf-schedule/terminalsAndMates",
  endpoint: "/ferries/api/schedule/rest/terminalsandmates/{tripDate}",
  inputSchema: terminalsAndMatesInput,
  outputSchema: terminalsAndMatesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalsAndMatesInput = z.infer<typeof terminalsAndMatesInput>;
