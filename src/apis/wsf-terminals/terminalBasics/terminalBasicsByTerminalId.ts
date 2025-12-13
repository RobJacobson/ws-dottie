import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalBasicsByIdInput,
  terminalBasicsByIdInputSchema,
} from "./shared/terminalBasics.input";
import {
  type TerminalBasic,
  terminalBasicSchema,
} from "./shared/terminalBasics.output";

/**
 * Metadata for the fetchTerminalBasicsByTerminalId endpoint
 */
export const terminalBasicsByTerminalIdMeta = {
  functionName: "fetchTerminalBasicsByTerminalId",
  endpoint: "/terminalBasics/{TerminalID}",
  inputSchema: terminalBasicsByIdInputSchema,
  outputSchema: terminalBasicSchema,
  sampleParams: { TerminalID: 1 },
  endpointDescription: "Get basic information for a specific terminal by ID.",
  toolDescription: {
    purpose:
      "Get basic identification and amenity information for a single terminal by its TerminalID.",
    useWhen: [
      "enriching a terminal picker with basic details",
      "getting terminal info when you already know the TerminalID",
      "minimizing payload size for single terminal queries",
    ],
    avoidWhen: [
      "you don't know the TerminalID (prefer fetchTerminalBasics to discover IDs)",
      "you need detailed terminal information (prefer fetchTerminalVerboseByTerminalId)",
    ],
    inputs: ["TerminalID: get it from fetchTerminalBasics → TerminalID"],
    returns: "object — one terminal profile",
    outputHighlights: [
      "IDs: TerminalID (primary key), TerminalSubjectID, RegionID",
      "Names: TerminalName, TerminalAbbrev",
      "Display: SortSeq (ordering for UI lists)",
      "Amenities: OverheadPassengerLoading, Elevator, WaitingRoom, FoodService, Restroom (boolean flags)",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalBasicsByTerminalId (for single terminal details)",
    ],
  },
} satisfies EndpointMeta<TerminalBasicsByIdInput, TerminalBasic>;

/**
 * Factory result for terminal basics by terminal ID
 */
const terminalBasicsByTerminalIdFactory = createFetchAndHook<
  TerminalBasicsByIdInput,
  TerminalBasic
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBasicsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBasics.endpoints").terminalBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalBasicsByTerminalId,
  hook: useTerminalBasicsByTerminalId,
} = terminalBasicsByTerminalIdFactory;
