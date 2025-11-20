import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import { serviceDisruptionsGroup } from "./shared/serviceDisruptions.endpoints";
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
 * Fetch function for retrieving routes with service disruptions for a specific trip date
 */
export const fetchRoutesHavingServiceDisruptionsByTripDate: FetchFactory<
  RoutesHavingServiceDisruptionsByTripDateInput,
  ServiceDisruption[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: routesHavingServiceDisruptionsByTripDateMeta,
});

/**
 * React Query hook for retrieving routes with service disruptions for a specific trip date
 */
export const useRoutesHavingServiceDisruptionsByTripDate: HookFactory<
  RoutesHavingServiceDisruptionsByTripDateInput,
  ServiceDisruption[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: routesHavingServiceDisruptionsByTripDateMeta.functionName,
  fetchFn: fetchRoutesHavingServiceDisruptionsByTripDate,
  cacheStrategy: serviceDisruptionsGroup.cacheStrategy,
});
