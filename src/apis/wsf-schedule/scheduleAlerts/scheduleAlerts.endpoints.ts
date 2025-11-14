import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import { scheduleAlertsInputSchema } from "./scheduleAlerts.input";
import { alertDetailSchema } from "./scheduleAlerts.output";

export const scheduleAlertsGroup = defineEndpointGroup({
  name: "schedule-alerts",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Schedule alerts provide important notifications about ferry service including delays, cancellations, terminal updates, and other service-related announcements.",
    businessContext: "",
  },
});

export const fetchScheduleAlerts = defineEndpoint({
  api: API,
  group: scheduleAlertsGroup,
  functionName: "fetchScheduleAlerts",
  endpoint: "/alerts",
  inputSchema: scheduleAlertsInputSchema,
  outputSchema: alertDetailSchema.array(),
  sampleParams: {},
  endpointDescription: "Returns all current schedule alerts.",
});
