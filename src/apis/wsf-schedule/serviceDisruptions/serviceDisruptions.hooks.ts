import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { serviceDisruptionsResource } from "./serviceDisruptions.endpoints";
import * as fetchFunctions from "./serviceDisruptions.fetch";
import type { RoutesHavingServiceDisruptionsByTripDateInput } from "./serviceDisruptions.input";
import type { ServiceDisruption } from "./serviceDisruptions.output";

const hooks = createHooks(
  wsfScheduleApi,
  serviceDisruptionsResource,
  fetchFunctions
);

export const useRoutesHavingServiceDisruptionsByTripDate: (
  params?: FetchFunctionParams<RoutesHavingServiceDisruptionsByTripDateInput>,
  options?: QueryHookOptions<ServiceDisruption[]>
) => UseQueryResult<ServiceDisruption[], Error> =
  hooks.useRoutesHavingServiceDisruptionsByTripDate;
