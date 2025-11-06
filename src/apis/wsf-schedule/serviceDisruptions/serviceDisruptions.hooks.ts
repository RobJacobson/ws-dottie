import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { serviceDisruptionsResource } from "./serviceDisruptions.endpoints";
import * as fetchFunctions from "./serviceDisruptions.fetch";
import type { RoutesHavingServiceDisruptionsByTripDateInput } from "./serviceDisruptions.input";
import type { ServiceDisruption } from "./serviceDisruptions.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  serviceDisruptionsResource,
  fetchFunctions
);

export const useRoutesHavingServiceDisruptionsByTripDate =
  hooks.useRoutesHavingServiceDisruptionsByTripDate as (
    params?: RoutesHavingServiceDisruptionsByTripDateInput,
    options?: QueryHookOptions<ServiceDisruption[]>
  ) => UseQueryResult<ServiceDisruption[], Error>;
