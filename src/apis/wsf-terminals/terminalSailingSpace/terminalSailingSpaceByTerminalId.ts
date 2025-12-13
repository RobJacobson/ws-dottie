import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalSailingSpaceByTerminalIdInput,
  terminalSailingSpaceByTerminalIdInputSchema,
} from "./shared/terminalSailingSpace.input";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./shared/terminalSailingSpace.output";

/**
 * Metadata for the fetchTerminalSailingSpaceByTerminalId endpoint
 */
export const terminalSailingSpaceByTerminalIdMeta = {
  functionName: "fetchTerminalSailingSpaceByTerminalId",
  endpoint: "/terminalSailingSpace/{TerminalID}",
  inputSchema: terminalSailingSpaceByTerminalIdInputSchema,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { TerminalID: 7 },
  endpointDescription:
    "Get sailing space availability for a specific terminal by ID.",
  toolDescription: {
    purpose:
      "Get real-time vehicle space availability for upcoming departures from a single terminal by its TerminalID.",
    useWhen: [
      "checking space availability for a specific terminal you're departing from",
      "getting real-time capacity info for a terminal you know by ID",
      "minimizing payload when you only need one terminal's sailing space",
    ],
    avoidWhen: [
      "you don't know the TerminalID (prefer fetchTerminalBasics to discover IDs)",
      "you need space info for multiple terminals (prefer fetchTerminalSailingSpace)",
    ],
    inputsHighlights:
      "TerminalID (get it from fetchTerminalBasics → TerminalID)",
    returns: "object — one terminal with sailing space data",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "DepartingSpaces array: upcoming departures with vessel and space details",
      "Departure info: Departure (datetime), IsCancelled, VesselID, VesselName, MaxSpaceCount",
      "SpaceForArrivalTerminals: nested array with space counts for each destination",
      "Space counts: ReservableSpaceCount, DriveUpSpaceCount with hex color indicators",
      "Fare collection: IsNoFareCollected, NoFareCollectedMsg flags",
      "Real-time data: changes frequently, contains nested arrays of departures/destinations",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalSailingSpaceByTerminalId",
    ],
  },
} satisfies EndpointMeta<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
>;

/**
 * Factory result for terminal sailing space by terminal ID
 */
const terminalSailingSpaceByTerminalIdFactory = createFetchAndHook<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalSailingSpaceByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalSailingSpace.endpoints")
      .terminalSailingSpaceGroup,
});

/**
 * Fetch function and React Query hook for retrieving sailing space availability for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalSailingSpaceByTerminalId,
  hook: useTerminalSailingSpaceByTerminalId,
} = terminalSailingSpaceByTerminalIdFactory;
