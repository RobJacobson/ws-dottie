import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./serviceDisruptions.input";
import * as o from "./serviceDisruptions.output";

export const serviceDisruptionsResource: EndpointGroup = {
  name: "service-disruptions",
  documentation: {
    resourceDescription:
      "Each ServiceDisruption item represents planned or unplanned interruptions to normal ferry service, including cancellations, delays, and route changes that affect passenger travel plans.",
    businessContext:
      "Use to identify service disruptions by providing route and date information for planning alternative travel arrangements.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getRoutesHavingServiceDisruptionsByTripDate: {
      function: "getRoutesHavingServiceDisruptionsByTripDate",
      endpoint: "/routeshavingservicedisruptions/{TripDate}",
      inputSchema: i.routesHavingServiceDisruptionsSchema,
      outputSchema: z.array(o.serviceDisruptionSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns multiple of ServiceDisruption for specified trip date.",
    } satisfies EndpointDefinition<
      i.RoutesHavingServiceDisruptionsInput,
      o.ServiceDisruption[]
    >,
  },
};
