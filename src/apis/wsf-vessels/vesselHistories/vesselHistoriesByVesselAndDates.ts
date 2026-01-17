import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselHistoriesByVesselNameAndDateRangeInput,
  vesselHistoriesByVesselNameAndDateRangeInputSchema,
} from "./shared/vesselHistories.input";
import {
  type VesselHistory,
  vesselHistorySchema,
} from "./shared/vesselHistories.output";

/**
 * Metadata for the fetchVesselHistoriesByVesselAndDates endpoint
 */
export const vesselHistoriesByVesselAndDatesMeta = {
  functionName: "fetchVesselHistoriesByVesselAndDates",
  endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
  inputSchema: vesselHistoriesByVesselNameAndDateRangeInputSchema,
  outputSchema: vesselHistorySchema.array(),
  sampleParams: {
    VesselName: "Tacoma",
    DateStart: "2025-09-01",
    DateEnd: "2025-10-01",
  },
  endpointDescription:
    "List historical voyage records for one vessel across a date range.",
  toolDescription: {
    purpose:
      "List historical voyage records for one vessel across a date range.",
    useWhen: [
      "delay analysis",
      "historical performance tracking",
      "schedule vs actual comparisons",
    ],
    avoidWhen: [
      "you don't know the vessel's name (prefer fetchVesselBasics to discover VesselName)",
    ],
    inputs: [
      "VesselName: from fetchVesselBasics → VesselName",
      "DateStart: YYYY-MM-DD format",
      "DateEnd: YYYY-MM-DD format",
    ],
    returns: "array — one item per voyage record",
    outputHighlights: [
      "Keys: VesselId (note casing), Vessel (name)",
      "Terminals: Departing, Arriving",
      "Time: ScheduledDepart, ActualDepart, EstArrival, Date (UTC datetimes)",
      "Semantics: some time fields may be null",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselName → call fetchVesselHistoriesByVesselAndDates",
    ],
  },
} satisfies EndpointMeta<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
>;

/**
 * Factory result for vessel histories by vessel and dates
 */
const vesselHistoriesByVesselAndDatesFactory = createFetchAndHook<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselHistoriesByVesselAndDatesMeta,
  getEndpointGroup: () =>
    require("./shared/vesselHistories.endpoints").vesselHistoriesGroup,
});

/**
 * Fetch function and React Query hook for retrieving historical sailing records for a vessel within a date range
 */
export const {
  fetch: fetchVesselHistoriesByVesselAndDates,
  hook: useVesselHistoriesByVesselAndDates,
} = vesselHistoriesByVesselAndDatesFactory;
