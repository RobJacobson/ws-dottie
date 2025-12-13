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
  toolDescription: {
    purpose:
      "List all currently active schedule seasons with their effective date ranges and PDF URLs.",
    useWhen: [
      "discovering available schedule seasons",
      "finding current season information",
      "accessing schedule PDF documents",
    ],
    inputs: [],
    returns: "array — one item per active schedule season",
    outputHighlights: [
      "IDs: ScheduleID (unique numeric identifier)",
      "Names: ScheduleName (human-readable season name)",
      "Season codes: ScheduleSeason (0=Spring, 1=Summer, 2=Fall, 3=Winter)",
      "PDF access: SchedulePDFUrl (link to printable schedule document)",
      "Date ranges: ScheduleStart, ScheduleEnd (UTC timestamps for season validity)",
    ],
  },
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
