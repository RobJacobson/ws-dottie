import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
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
export const fetchRoutesHavingServiceDisruptionsByTripDate: (
  params?: FetchFunctionParams<RoutesHavingServiceDisruptionsByTripDateInput>
) => Promise<ServiceDisruption[]> = createFetchFunction(
  wsfScheduleApi.api,
  serviceDisruptionsGroup,
  routesHavingServiceDisruptionsByTripDateMeta
);

/**
 * React Query hook for retrieving routes with service disruptions for a specific trip date
 */
export const useRoutesHavingServiceDisruptionsByTripDate: (
  params?: FetchFunctionParams<RoutesHavingServiceDisruptionsByTripDateInput>,
  options?: QueryHookOptions<ServiceDisruption[]>
) => UseQueryResult<ServiceDisruption[], Error> = createHook(
  wsfScheduleApi.api,
  serviceDisruptionsGroup,
  routesHavingServiceDisruptionsByTripDateMeta
);
