import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { activeSeasonsGroup } from "./shared/activeSeasons.endpoints";
import {
  type ActiveSeasonsInput,
  activeSeasonsInputSchema,
} from "./shared/activeSeasons.input";
import {
  type ActiveSeason,
  scheduleBaseSchema,
} from "./shared/activeSeasons.output";

/**
 * Metadata for the fetchActiveSeasons endpoint
 */
export const activeSeasonsMeta = {
  functionName: "fetchActiveSeasons",
  endpoint: "/activeseasons",
  inputSchema: activeSeasonsInputSchema,
  outputSchema: scheduleBaseSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List all active schedule seasons with dates and PDF URLs.",
} satisfies EndpointMeta<ActiveSeasonsInput, ActiveSeason[]>;

/**
 * Fetch function for retrieving all active schedule seasons with dates and PDF URLs
 */
export const fetchActiveSeasons: (
  params?: FetchFunctionParams<ActiveSeasonsInput>
) => Promise<ActiveSeason[]> = createFetchFunction(
  wsfScheduleApi,
  activeSeasonsGroup,
  activeSeasonsMeta
);

/**
 * React Query hook for retrieving all active schedule seasons with dates and PDF URLs
 */
export const useActiveSeasons: (
  params?: FetchFunctionParams<ActiveSeasonsInput>,
  options?: QueryHookOptions<ActiveSeason[]>
) => UseQueryResult<ActiveSeason[], Error> = createHook(
  wsfScheduleApi,
  activeSeasonsGroup,
  activeSeasonsMeta
);
