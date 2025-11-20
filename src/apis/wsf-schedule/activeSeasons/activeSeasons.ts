import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchActiveSeasons: FetchFactory<
  ActiveSeasonsInput,
  ActiveSeason[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: activeSeasonsMeta,
});

/**
 * React Query hook for retrieving all active schedule seasons with dates and PDF URLs
 */
export const useActiveSeasons: HookFactory<ActiveSeasonsInput, ActiveSeason[]> =
  createHook({
    apiName: wsfScheduleApiMeta.name,
    endpointName: activeSeasonsMeta.functionName,
    fetchFn: fetchActiveSeasons,
    cacheStrategy: activeSeasonsGroup.cacheStrategy,
  });
