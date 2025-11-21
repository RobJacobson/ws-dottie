import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type RoutesHavingServiceDisruptionsByTripDateInput,
  routesHavingServiceDisruptionsByTripDateInputSchema,
} from "./shared/serviceDisruptions.input";
import {
  type ServiceDisruption,
  serviceDisruptionSchema,
} from "./shared/serviceDisruptions.output";

/**
 * Metadata for the fetchRoutesHavingServiceDisruptionsByTripDate endpoint
 */
export const routesHavingServiceDisruptionsByTripDateMeta = {
  functionName: "fetchRoutesHavingServiceDisruptionsByTripDate",
  endpoint: "/routeshavingservicedisruptions/{TripDate}",
  inputSchema: routesHavingServiceDisruptionsByTripDateInputSchema,
  outputSchema: serviceDisruptionSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "List routes with service disruptions for a specific trip date.",
} satisfies EndpointMeta<
  RoutesHavingServiceDisruptionsByTripDateInput,
  ServiceDisruption[]
>;

/**
 * Factory result for routes having service disruptions by trip date
 */
const routesHavingServiceDisruptionsByTripDateFactory = createFetchAndHook<
  RoutesHavingServiceDisruptionsByTripDateInput,
  ServiceDisruption[]
>({
  api: wsfScheduleApiMeta,
  endpoint: routesHavingServiceDisruptionsByTripDateMeta,
  getEndpointGroup: () =>
    require("./shared/serviceDisruptions.endpoints").serviceDisruptionsGroup,
});

/**
 * Fetch function and React Query hook for retrieving routes with service disruptions for a specific trip date
 */
export const {
  fetch: fetchRoutesHavingServiceDisruptionsByTripDate,
  hook: useRoutesHavingServiceDisruptionsByTripDate,
} = routesHavingServiceDisruptionsByTripDateFactory;
