import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./serviceDisruptions.input";
import * as o from "./serviceDisruptions.output";

export const serviceDisruptionsResource: EndpointGroup = {
  name: "service-disruptions",
  documentation: {
    resourceDescription:
      "Service disruptions represent planned or unplanned interruptions to normal ferry service, including cancellations, delays, and route changes.",
    businessContext: "",
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
        "Returns service disruptions for routes on the specified trip date.",
    } satisfies EndpointDefinition<
      i.RoutesHavingServiceDisruptionsInput,
      o.ServiceDisruption[]
    >,
  },
};
