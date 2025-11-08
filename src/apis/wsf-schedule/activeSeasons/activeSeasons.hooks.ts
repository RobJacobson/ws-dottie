import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { activeSeasonsResource } from "./activeSeasons.endpoints";
import * as fetchFunctions from "./activeSeasons.fetch";
import type { ActiveSeasonsInput } from "./activeSeasons.input";
import type { ScheduleBase } from "./activeSeasons.output";

const hooks = createHooks(
  wsfScheduleApi,
  activeSeasonsResource,
  fetchFunctions
);

export const useActiveSeasons: (
  params?: FetchFunctionParams<ActiveSeasonsInput>,
  options?: QueryHookOptions<ScheduleBase[]>
) => UseQueryResult<ScheduleBase[], Error> = hooks.useActiveSeasons;
