import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { scheduleAlertsInputSchema } from "./scheduleAlerts.input";
import { alertDetailSchema } from "./scheduleAlerts.output";

export const scheduleAlertsGroup: EndpointGroup = {
  name: "schedule-alerts",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Service alerts and notifications for ferry schedules.",
    description:
      "Important notifications about ferry service including delays, cancellations, terminal updates, and service-related announcements. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display service alerts and notifications in rider apps.",
      "Monitor schedule changes and disruptions.",
      "Show route-specific and system-wide announcements.",
    ],
  },
};

export const fetchScheduleAlerts = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleAlertsGroup,
  functionName: "fetchScheduleAlerts",
  endpoint: "/alerts",
  inputSchema: scheduleAlertsInputSchema,
  outputSchema: alertDetailSchema.array(),
  sampleParams: {},
  endpointDescription: "List all current schedule alerts.",
});
