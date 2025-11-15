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
    resourceDescription:
      "Each ServiceDisruption item represents planned or unplanned interruptions to normal ferry service, including cancellations, delays, and route changes that affect passenger travel plans.",
    businessContext:
      "Use to identify service disruptions by providing route and date information for planning alternative travel arrangements.",
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
    "Returns multiple of ServiceDisruption for specified trip date.",
});
