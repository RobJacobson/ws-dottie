import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { serviceDisruptionsResource } from "./serviceDisruptions.endpoints";
import type { RoutesHavingServiceDisruptionsByTripDateInput } from "./serviceDisruptions.input";
import type { ServiceDisruption } from "./serviceDisruptions.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  serviceDisruptionsResource
);

export const fetchRoutesHavingServiceDisruptionsByTripDate: (
  params?: FetchFunctionParams<RoutesHavingServiceDisruptionsByTripDateInput>
) => Promise<ServiceDisruption[]> =
  fetchFunctions.fetchRoutesHavingServiceDisruptionsByTripDate;
