import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for active seasons
 */
const activeSeasonsFactory = createFetchAndHook<
  ActiveSeasonsInput,
  ActiveSeason[]
>({
  api: wsfScheduleApiMeta,
  endpoint: activeSeasonsMeta,
  getEndpointGroup: () =>
    require("./shared/activeSeasons.endpoints").activeSeasonsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all active schedule seasons with dates and PDF URLs
 */
export const { fetch: fetchActiveSeasons, hook: useActiveSeasons } =
  activeSeasonsFactory;
