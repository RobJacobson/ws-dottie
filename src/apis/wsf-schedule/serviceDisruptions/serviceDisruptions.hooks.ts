import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
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
