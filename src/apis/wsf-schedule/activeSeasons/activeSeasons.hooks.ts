import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
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
