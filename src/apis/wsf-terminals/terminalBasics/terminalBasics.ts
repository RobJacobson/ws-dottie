import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalBasicsInput,
  terminalBasicsInputSchema,
} from "./shared/terminalBasics.input";
import {
  type TerminalBasic,
  terminalBasicSchema,
} from "./shared/terminalBasics.output";

/**
 * Metadata for the fetchTerminalBasics endpoint
 */
export const terminalBasicsMeta = {
  functionName: "fetchTerminalBasics",
  endpoint: "/terminalBasics",
  inputSchema: terminalBasicsInputSchema,
  outputSchema: terminalBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all terminals.",
  toolDescription: {
    purpose:
      "List basic identification and amenity information for all terminals in the WSF system.",
    useWhen: [
      "discovering TerminalID values for specific terminals",
      "building terminal selection interfaces",
      "getting overview of terminal locations and basic facilities",
    ],
    avoidWhen: [
      "you only need one terminal (prefer fetchTerminalBasicsByTerminalId)",
      "you need detailed terminal information (prefer fetchTerminalVerbose or fetchTerminalVerboseByTerminalId)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per terminal",
    outputHighlights: [
      "IDs: TerminalID (primary key), TerminalSubjectID, RegionID",
      "Names: TerminalName, TerminalAbbrev",
      "Display: SortSeq (ordering for UI lists)",
      "Amenities: OverheadPassengerLoading, Elevator, WaitingRoom, FoodService, Restroom (boolean flags)",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalVerboseByTerminalId / fetchTerminalLocationsByTerminalId / fetchTerminalBulletinsByTerminalId",
    ],
  },
} satisfies EndpointMeta<TerminalBasicsInput, TerminalBasic[]>;

/**
 * Factory result for terminal basics
 */
const terminalBasicsFactory = createFetchAndHook<
  TerminalBasicsInput,
  TerminalBasic[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBasicsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBasics.endpoints").terminalBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for all terminals
 */
export const { fetch: fetchTerminalBasics, hook: useTerminalBasics } =
  terminalBasicsFactory;
