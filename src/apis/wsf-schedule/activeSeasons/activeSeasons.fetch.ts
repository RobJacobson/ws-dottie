import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { activeSeasonsResource } from "./activeSeasons.endpoints";
import type { ActiveSeasonsInput } from "./activeSeasons.input";
import type { ScheduleBase } from "./activeSeasons.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  activeSeasonsResource
);

export const fetchActiveSeasons: (
  params?: FetchFunctionParams<ActiveSeasonsInput>
) => Promise<ScheduleBase[]> = fetchFunctions.fetchActiveSeasons;
