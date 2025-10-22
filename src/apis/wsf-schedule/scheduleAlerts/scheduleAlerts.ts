import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./scheduleAlerts.input";
import * as o from "./scheduleAlerts.output";

export const scheduleAlertsResource: EndpointGroup = {
  name: "schedule-alerts",
  documentation: {
    resourceDescription:
      "Schedule alerts provide important notifications about ferry service including delays, cancellations, terminal updates, and other service-related announcements.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
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
