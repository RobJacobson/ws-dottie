import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { activeSeasonsResource } from "./activeSeasons.endpoints";
import type { ActiveSeasonsInput } from "./activeSeasons.input";
import type { ScheduleBase } from "./activeSeasons.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  activeSeasonsResource
);

export const fetchActiveSeasons = fetchFunctions.fetchActiveSeasons as (
  params?: FetchFunctionParams<ActiveSeasonsInput>
) => Promise<ScheduleBase[]>;
