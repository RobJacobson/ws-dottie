import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
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
