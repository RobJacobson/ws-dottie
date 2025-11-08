import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod";
import {
  type RoutesHavingServiceDisruptionsByTripDateInput,
  routesHavingServiceDisruptionsByTripDateInputSchema,
} from "./serviceDisruptions.input";
import {
  type ServiceDisruption,
  serviceDisruptionSchema,
} from "./serviceDisruptions.output";

export const serviceDisruptionsResource = {
  name: "service-disruptions",
  documentation: {
    resourceDescription:
      "Each ServiceDisruption item represents planned or unplanned interruptions to normal ferry service, including cancellations, delays, and route changes that affect passenger travel plans.",
    businessContext:
      "Use to identify service disruptions by providing route and date information for planning alternative travel arrangements.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchRoutesHavingServiceDisruptionsByTripDate: {
      endpoint: "/routeshavingservicedisruptions/{TripDate}",
      inputSchema: routesHavingServiceDisruptionsByTripDateInputSchema,
      outputSchema: z.array(serviceDisruptionSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns multiple of ServiceDisruption for specified trip date.",
    } satisfies EndpointDefinition<
      RoutesHavingServiceDisruptionsByTripDateInput,
      ServiceDisruption[]
    >,
  },
} satisfies EndpointGroup;
