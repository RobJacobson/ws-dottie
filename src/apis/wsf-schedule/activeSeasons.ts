import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Active scheduled seasons represent the current and available scheduling periods for Washington State Ferry routes. Each season defines the time period when specific schedules are active.";

export const activeSeasonsResource = {
  name: "active-seasons",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getActiveSeasons",
      endpoint: "/activeseasons",
      inputSchema: i.activeScheduledSeasonsSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of all active scheduled seasons. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.ActiveScheduledSeasonsInput,
      o.ScheduleBase[]
    >,
  },
};
