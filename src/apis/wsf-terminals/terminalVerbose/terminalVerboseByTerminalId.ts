import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalVerboseByTerminalIdInput,
  terminalVerboseByTerminalIdInputSchema,
} from "./shared/terminalVerbose.input";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "./shared/terminalVerbose.output";

/**
 * Metadata for the fetchTerminalVerboseByTerminalId endpoint
 */
export const terminalVerboseByTerminalIdMeta = {
  functionName: "fetchTerminalVerboseByTerminalId",
  endpoint: "/terminalVerbose/{TerminalID}",
  inputSchema: terminalVerboseByTerminalIdInputSchema,
  outputSchema: terminalVerboseSchema,
  sampleParams: { TerminalID: 4 },
  endpointDescription:
    "Get comprehensive information for a specific terminal by ID.",
  toolDescription: {
    purpose:
      "Get complete terminal profile combining all available data for a single terminal by its TerminalID.",
    useWhen: [
      "building detailed terminal pages with all available information",
      "enriching terminal data when you need everything for one location",
      "minimizing requests when you need multiple data types for the same terminal",
    ],
    avoidWhen: [
      "you don't know the TerminalID (prefer fetchTerminalBasics to discover IDs)",
      "you only need specific data types (prefer targeted endpoints like fetchTerminalLocationsByTerminalId)",
    ],
    inputs: ["TerminalID: from fetchTerminalBasics → TerminalID"],
    returns: "object — one complete terminal profile",
    outputHighlights: [
      "Combines ALL terminal data: basics + bulletins + locations + sailing space + transports + wait times",
      "IDs: TerminalID, TerminalSubjectID, RegionID",
      "Names: TerminalName, TerminalAbbrev, SortSeq",
      "Amenities: OverheadPassengerLoading, Elevator, WaitingRoom, FoodService, Restroom",
      "Bulletins: full bulletins array with HTML content and metadata",
      "Location: coordinates, full address, map links, directions, GIS zoom levels",
      "Sailing space: real-time departure schedules with vehicle capacity and availability",
      "Transportation: parking, airport shuttles, vehicle tips, transit links (extensive HTML)",
      "Wait times: current passenger wait time estimates",
      "Large payload: contains all data for one terminal, but still substantial",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalVerboseByTerminalId",
    ],
  },
} satisfies EndpointMeta<TerminalVerboseByTerminalIdInput, TerminalVerbose>;

/**
 * Factory result for terminal verbose by terminal ID
 */
const terminalVerboseByTerminalIdFactory = createFetchAndHook<
  TerminalVerboseByTerminalIdInput,
  TerminalVerbose
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalVerboseByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalVerbose.endpoints").terminalVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving comprehensive information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalVerboseByTerminalId,
  hook: useTerminalVerboseByTerminalId,
} = terminalVerboseByTerminalIdFactory;
