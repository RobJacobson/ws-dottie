import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";
import { activeSeasonsInputSchema } from "./activeSeasons.input";
import { scheduleBaseSchema } from "./activeSeasons.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "active-seasons",
  documentation: {
    resourceDescription:
      "Each ActiveSeasons item represents a scheduling period for Washington State Ferry routes. Each season defines the time period when specific schedules are active and available for passenger travel planning.",
    businessContext:
      "Use to identify current scheduling periods by providing season dates and availability status for ferry service planning and schedule selection.",
  },
  cacheStrategy: "STATIC",
});

export const fetchActiveSeasons = defineEndpoint({
  group,
  functionName: "fetchActiveSeasons",
  definition: {
    endpoint: "/activeseasons",
    inputSchema: activeSeasonsInputSchema,
    outputSchema: scheduleBaseSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple of ActiveSeasons for all scheduling periods.",
  },
});

export const activeSeasonsResource = group.descriptor;
