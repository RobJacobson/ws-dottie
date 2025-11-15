import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import { routesHavingServiceDisruptionsByTripDateInputSchema } from "./serviceDisruptions.input";
import { serviceDisruptionSchema } from "./serviceDisruptions.output";

export const serviceDisruptionsGroup: EndpointGroup = {
  name: "service-disruptions",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Service disruptions affecting ferry routes.",
    description:
      "Planned or unplanned interruptions to normal ferry service including cancellations, delays, and route changes. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Identify routes with service disruptions for a specific date.",
      "Plan alternative travel arrangements when disruptions occur.",
      "Display disruption information to passengers.",
    ],
  },
};

export const fetchRoutesHavingServiceDisruptionsByTripDate = createEndpoint({
  api: apis.wsfSchedule,
  group: serviceDisruptionsGroup,
  functionName: "fetchRoutesHavingServiceDisruptionsByTripDate",
  endpoint: "/routeshavingservicedisruptions/{TripDate}",
  inputSchema: routesHavingServiceDisruptionsByTripDateInputSchema,
  outputSchema: serviceDisruptionSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "List routes with service disruptions for a specific trip date.",
});
