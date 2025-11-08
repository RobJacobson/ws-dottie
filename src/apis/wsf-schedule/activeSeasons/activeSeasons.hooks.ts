import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { activeSeasonsResource } from "./activeSeasons.endpoints";
import * as fetchFunctions from "./activeSeasons.fetch";
import type { ActiveSeasonsInput } from "./activeSeasons.input";
import type { ScheduleBase } from "./activeSeasons.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  activeSeasonsResource,
  fetchFunctions
);

export const useActiveSeasons: (
  params?: ActiveSeasonsInput,
  options?: QueryHookOptions<ScheduleBase[]>
) => UseQueryResult<ScheduleBase[], Error> = hooks.useActiveSeasons;
