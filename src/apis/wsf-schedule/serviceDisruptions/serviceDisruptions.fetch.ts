import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { serviceDisruptionsResource } from "./serviceDisruptions.endpoints";
import type { RoutesHavingServiceDisruptionsByTripDateInput } from "./serviceDisruptions.input";
import type { ServiceDisruption } from "./serviceDisruptions.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  serviceDisruptionsResource
);

export const fetchRoutesHavingServiceDisruptionsByTripDate =
  fetchFunctions.fetchRoutesHavingServiceDisruptionsByTripDate as (
    params?: FetchFunctionParams<RoutesHavingServiceDisruptionsByTripDateInput>
  ) => Promise<ServiceDisruption[]>;
