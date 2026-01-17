import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalVerboseInput,
  terminalVerboseInputSchema,
} from "./shared/terminalVerbose.input";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "./shared/terminalVerbose.output";

/**
 * Metadata for the fetchTerminalVerbose endpoint
 */
export const terminalVerboseMeta = {
  functionName: "fetchTerminalVerbose",
  endpoint: "/terminalVerbose",
  inputSchema: terminalVerboseInputSchema,
  outputSchema: terminalVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List comprehensive information for all terminals.",
  toolDescription: {
    purpose:
      "List complete terminal profiles combining all available data for all terminals in the WSF system.",
    useWhen: [
      "building offline applications needing all terminal data",
      "one-time bulk export of complete terminal information",
      "debugging or data analysis requiring full terminal datasets",
    ],
    avoidWhen: [
      "you only need one terminal (prefer fetchTerminalVerboseByTerminalId)",
      "you only need specific data types (prefer targeted endpoints like fetchTerminalBasics or fetchTerminalLocations)",
    ],
    inputs: [],
    returns: "array — one item per terminal",
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
      "Massive payload: contains all terminal data combined, extremely large response",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalVerboseByTerminalId (preferred for single terminal)",
    ],
  },
} satisfies EndpointMeta<TerminalVerboseInput, TerminalVerbose[]>;

/**
 * Factory result for terminal verbose
 */
const terminalVerboseFactory = createFetchAndHook<
  TerminalVerboseInput,
  TerminalVerbose[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalVerboseMeta,
  getEndpointGroup: () =>
    require("./shared/terminalVerbose.endpoints").terminalVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving comprehensive information for all terminals
 */
export const { fetch: fetchTerminalVerbose, hook: useTerminalVerbose } =
  terminalVerboseFactory;
