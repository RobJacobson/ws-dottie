import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./activeSeasons.input";
import * as o from "./activeSeasons.output";

export const activeSeasonsResource = {
  name: "active-seasons",
  documentation: {
    resourceDescription:
      "Each ActiveSeasons item represents a scheduling period for Washington State Ferry routes. Each season defines the time period when specific schedules are active and available for passenger travel planning.",
    businessContext:
      "Use to identify current scheduling periods by providing season dates and availability status for ferry service planning and schedule selection.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getActiveSeasons: {
      function: "getActiveSeasons",
      endpoint: "/activeseasons",
      inputSchema: i.activeScheduledSeasonsSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple of ActiveSeasons for all scheduling periods.",
    } satisfies EndpointDefinition<
      i.ActiveScheduledSeasonsInput,
      o.ScheduleBase[]
    >,
  },
} satisfies EndpointGroup;
