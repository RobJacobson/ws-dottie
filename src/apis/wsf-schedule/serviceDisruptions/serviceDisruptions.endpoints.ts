import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApi } from "../apiDefinition";
import { routesHavingServiceDisruptionsByTripDateInputSchema } from "./serviceDisruptions.input";
import { serviceDisruptionSchema } from "./serviceDisruptions.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "service-disruptions",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each ServiceDisruption item represents planned or unplanned interruptions to normal ferry service, including cancellations, delays, and route changes that affect passenger travel plans.",
    businessContext:
      "Use to identify service disruptions by providing route and date information for planning alternative travel arrangements.",
  },
});

export const fetchRoutesHavingServiceDisruptionsByTripDate = defineEndpoint({
  group,
  functionName: "fetchRoutesHavingServiceDisruptionsByTripDate",
  definition: {
    endpoint: "/routeshavingservicedisruptions/{TripDate}",
    inputSchema: routesHavingServiceDisruptionsByTripDateInputSchema,
    outputSchema: serviceDisruptionSchema.array(),
    sampleParams: { TripDate: datesHelper.tomorrow() },
    endpointDescription:
      "Returns multiple of ServiceDisruption for specified trip date.",
  },
});

export const serviceDisruptionsResource = group.descriptor;
