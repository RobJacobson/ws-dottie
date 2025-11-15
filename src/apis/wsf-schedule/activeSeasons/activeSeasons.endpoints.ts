import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { activeSeasonsInputSchema } from "./activeSeasons.input";
import { scheduleBaseSchema } from "./activeSeasons.output";

export const activeSeasonsGroup: EndpointGroup = {
  name: "active-seasons",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each ActiveSeasons item represents a scheduling period for Washington State Ferry routes. Each season defines the time period when specific schedules are active and available for passenger travel planning.",
    businessContext:
      "Use to identify current scheduling periods by providing season dates and availability status for ferry service planning and schedule selection.",
  },
};

export const fetchActiveSeasons = defineEndpoint({
  api: apis.wsfSchedule,
  group: activeSeasonsGroup,
  functionName: "fetchActiveSeasons",
  endpoint: "/activeseasons",
  inputSchema: activeSeasonsInputSchema,
  outputSchema: scheduleBaseSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple of ActiveSeasons for all scheduling periods.",
});
