import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselHistoriesInput,
  vesselHistoriesInputSchema,
} from "./shared/vesselHistories.input";
import {
  type VesselHistory,
  vesselHistorySchema,
} from "./shared/vesselHistories.output";

/**
 * Metadata for the fetchVesselHistories endpoint
 */
export const vesselHistoriesMeta = {
  functionName: "fetchVesselHistories",
  endpoint: "/vesselHistory",
  inputSchema: vesselHistoriesInputSchema,
  outputSchema: vesselHistorySchema.array(),
  sampleParams: {},
  endpointDescription: "List historical sailing records for all vessels.",
  toolDescription: {
    purpose:
      "List basic vessel information for historical sailing records (may contain mostly null data).",
    useWhen: [
      "getting a basic list of vessels with historical data available",
      "discovering which vessels have voyage history",
    ],
    avoidWhen: [
      "you need detailed voyage records (prefer fetchVesselHistoriesByVesselAndDates)",
    ],
    inputs: [],
    returns: "array — one item per vessel with basic historical info",
    outputHighlights: [
      "Keys: VesselId (note casing), Vessel (name)",
      "Terminals: Departing, Arriving (may be null)",
      "Time: ScheduledDepart, ActualDepart, EstArrival, Date (may be null UTC datetimes)",
      "Note: this endpoint often returns mostly null values",
    ],
    chaining: [
      "fetchVesselHistories → extract Vessel → call fetchVesselHistoriesByVesselAndDates",
    ],
  },
} satisfies EndpointMeta<VesselHistoriesInput, VesselHistory[]>;

/**
 * Factory result for vessel histories
 */
const vesselHistoriesFactory = createFetchAndHook<
  VesselHistoriesInput,
  VesselHistory[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselHistoriesMeta,
  getEndpointGroup: () =>
    require("./shared/vesselHistories.endpoints").vesselHistoriesGroup,
});

/**
 * Fetch function and React Query hook for retrieving historical sailing records for all vessels
 */
export const { fetch: fetchVesselHistories, hook: useVesselHistories } =
  vesselHistoriesFactory;
