import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const scheduleAlertsResource = {
  name: "schedule-alerts",
  resourceDescription:
    "Schedule alerts provide important notifications about ferry service including delays, cancellations, terminal updates, and other service-related announcements.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduleAlerts: {
      function: "getScheduleAlerts",
      endpoint: "/alerts",
      inputSchema: i.allAlertsSchema,
      outputSchema: z.array(o.alertDetailSchema),
      sampleParams: {},
      endpointDescription: "Returns all current schedule alerts.",
    } satisfies EndpointDefinition<i.AllAlertsInput, o.AlertDetail[]>,
  },
};
