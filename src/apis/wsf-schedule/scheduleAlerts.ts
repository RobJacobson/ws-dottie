import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Schedule alerts provide important notifications about ferry service including delays, cancellations, terminal updates, and other service-related announcements.";

export const scheduleAlertsResource = {
  name: "schedule-alerts",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getScheduleAlerts",
      endpoint: "/alerts",
      inputSchema: i.allAlertsSchema,
      outputSchema: z.array(o.alertDetailSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns all current schedule alerts. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.AllAlertsInput, o.AlertDetail[]>,
  },
};
