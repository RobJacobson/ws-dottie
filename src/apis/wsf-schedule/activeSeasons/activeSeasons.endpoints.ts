import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { activeSeasonsInputSchema } from "./activeSeasons.input";
import { scheduleBaseSchema } from "./activeSeasons.output";

export const activeSeasonsGroup: EndpointGroup = {
  name: "active-seasons",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Active schedule seasons for WSF routes.",
    description:
      "Scheduling periods defining when specific ferry schedules are active, including season dates, names, and PDF URLs.",
    useCases: [
      "Identify which schedule seasons are currently active.",
      "Determine valid date ranges for schedule queries.",
      "Access printable schedule PDF documents.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchActiveSeasons = createEndpoint({
  api: apis.wsfSchedule,
  group: activeSeasonsGroup,
  functionName: "fetchActiveSeasons",
  endpoint: "/activeseasons",
  inputSchema: activeSeasonsInputSchema,
  outputSchema: scheduleBaseSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List all active schedule seasons with dates and PDF URLs.",
});
