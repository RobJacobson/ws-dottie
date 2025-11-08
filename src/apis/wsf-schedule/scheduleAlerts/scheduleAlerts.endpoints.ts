import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type ScheduleAlertsInput,
  scheduleAlertsInputSchema,
} from "./scheduleAlerts.input";
import { type AlertDetail, alertDetailSchema } from "./scheduleAlerts.output";

export const scheduleAlertsResource = {
  name: "schedule-alerts",
  documentation: {
    resourceDescription:
      "Schedule alerts provide important notifications about ferry service including delays, cancellations, terminal updates, and other service-related announcements.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchScheduleAlerts: {
      endpoint: "/alerts",
      inputSchema: scheduleAlertsInputSchema,
      outputSchema: z.array(alertDetailSchema),
      sampleParams: {},
      endpointDescription: "Returns all current schedule alerts.",
    } satisfies EndpointDefinition<ScheduleAlertsInput, AlertDetail[]>,
  },
} satisfies EndpointGroup;
