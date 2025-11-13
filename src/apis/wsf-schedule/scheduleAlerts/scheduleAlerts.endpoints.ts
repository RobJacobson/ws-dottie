import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleAlertsInputSchema } from "./scheduleAlerts.input";
import { alertDetailSchema } from "./scheduleAlerts.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "schedule-alerts",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Schedule alerts provide important notifications about ferry service including delays, cancellations, terminal updates, and other service-related announcements.",
    businessContext: "",
  },
});

export const fetchScheduleAlerts = defineEndpoint({
  group,
  functionName: "fetchScheduleAlerts",
  definition: {
    endpoint: "/alerts",
    inputSchema: scheduleAlertsInputSchema,
    outputSchema: alertDetailSchema.array(),
    sampleParams: {},
    endpointDescription: "Returns all current schedule alerts.",
  },
});

export const scheduleAlertsResource = group.descriptor;
