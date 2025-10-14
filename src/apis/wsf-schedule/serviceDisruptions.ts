import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Service disruptions represent planned or unplanned interruptions to normal ferry service, including cancellations, delays, and route changes.";

export const serviceDisruptionsResource = {
  name: "service-disruptions",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byTripDate: {
      function: "getRoutesHavingServiceDisruptionsByTripDate",
      endpoint: "/routeshavingservicedisruptions/{TripDate}",
      inputSchema: i.routesHavingServiceDisruptionsSchema,
      outputSchema: z.array(o.serviceDisruptionSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: `Returns service disruptions for routes on the specified trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.RoutesHavingServiceDisruptionsInput,
      o.ServiceDisruption[]
    >,
  },
};
