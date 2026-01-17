import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalSailingSpaceInput,
  terminalSailingSpaceInputSchema,
} from "./shared/terminalSailingSpace.input";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./shared/terminalSailingSpace.output";

/**
 * Metadata for the fetchTerminalSailingSpace endpoint
 */
export const terminalSailingSpaceMeta = {
  functionName: "fetchTerminalSailingSpace",
  endpoint: "/terminalSailingSpace",
  inputSchema: terminalSailingSpaceInputSchema,
  outputSchema: terminalSailingSpaceSchema.array(),
  sampleParams: {},
  endpointDescription: "List sailing space availability for all terminals.",
  toolDescription: {
    purpose:
      "List real-time vehicle space availability for upcoming departures from all terminals in the WSF system.",
    useWhen: [
      "checking current vehicle capacity and reservations for all terminals",
      "building real-time space availability dashboards",
      "getting comprehensive sailing space overview across all terminals",
    ],
    avoidWhen: [
      "you only need space info for one terminal (prefer fetchTerminalSailingSpaceByTerminalId)",
      "you need static terminal data (prefer other terminal endpoints)",
    ],
    inputs: [],
    returns: "array — one item per terminal",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "DepartingSpaces array: upcoming departures with vessel and space details (can be lengthy)",
      "Departure info: Departure (datetime), IsCancelled, VesselID, VesselName, MaxSpaceCount",
      "SpaceForArrivalTerminals: nested array with space counts for each destination",
      "Space counts: ReservableSpaceCount, DriveUpSpaceCount with hex color indicators",
      "Fare collection: IsNoFareCollected, NoFareCollectedMsg flags",
      "Large payload: real-time data changes frequently, contains nested arrays of departures/destinations",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalSailingSpaceByTerminalId (for single terminal space info)",
    ],
  },
} satisfies EndpointMeta<TerminalSailingSpaceInput, TerminalSailingSpace[]>;

/**
 * Factory result for terminal sailing space
 */
const terminalSailingSpaceFactory = createFetchAndHook<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalSailingSpaceMeta,
  getEndpointGroup: () =>
    require("./shared/terminalSailingSpace.endpoints")
      .terminalSailingSpaceGroup,
});

/**
 * Fetch function and React Query hook for retrieving sailing space availability for all terminals
 */
export const {
  fetch: fetchTerminalSailingSpace,
  hook: useTerminalSailingSpace,
} = terminalSailingSpaceFactory;
