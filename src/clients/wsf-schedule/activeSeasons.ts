import { z } from "zod";

import {
  type ScheduleBriefResponses,
  scheduleBriefResponsesSchema,
} from "@/schemas/wsf-schedule/scheduleBriefResponse";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getActiveSeasons */
const activeSeasonsInput = z.object({}).strict();

/** Endpoint metadata for getActiveSeasons */
export const getActiveSeasonsMeta: EndpointDefinition<
  ActiveSeasonsInput,
  ScheduleBriefResponses
> = {
  api: "wsf-schedule",
  function: "activeSeasons",
  endpoint: "/ferries/api/schedule/rest/activeseasons",
  inputSchema: activeSeasonsInput,
  outputSchema: scheduleBriefResponsesSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type ActiveSeasonsInput = z.infer<typeof activeSeasonsInput>;
