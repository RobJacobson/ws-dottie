import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { serviceDisruptionsResource } from "./serviceDisruptions.endpoints";
import type { RoutesHavingServiceDisruptionsByTripDateInput } from "./serviceDisruptions.input";
import type { ServiceDisruption } from "./serviceDisruptions.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  serviceDisruptionsResource
);

export const fetchRoutesHavingServiceDisruptionsByTripDate: (
  params?: FetchFunctionParams<RoutesHavingServiceDisruptionsByTripDateInput>
) => Promise<ServiceDisruption[]> = fetchFunctions.fetchRoutesHavingServiceDisruptionsByTripDate;
