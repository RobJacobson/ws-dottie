import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import {
  type TerminalComboFaresVerboseInput,
  terminalComboFaresVerboseInputSchema,
} from "./shared/terminalCombo.input";
import {
  type TerminalComboFaresVerbose,
  terminalComboFaresVerboseSchema,
} from "./shared/terminalCombo.output";

/**
 * Metadata for the fetchTerminalComboFaresVerbose endpoint
 */
export const terminalComboFaresVerboseMeta = {
  functionName: "fetchTerminalComboFaresVerbose",
  endpoint: "/terminalComboVerbose/{TripDate}",
  inputSchema: terminalComboFaresVerboseInputSchema,
  outputSchema: terminalComboFaresVerboseSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "Get fare collection descriptions for all terminal combinations on a trip date.",
  toolDescription: {
    purpose:
      "Get fare collection procedures for all terminal pairs on a specific trip date.",
    useWhen: [
      "building comprehensive fare collection reference for all routes",
      "analyzing fare collection patterns across terminal network",
      "creating fare payment guides for multiple destinations",
    ],
    avoidWhen: [
      "you only need one terminal pair (prefer fetchTerminalComboFares)",
    ],
    inputs: ["TripDate: YYYY-MM-DD format, from fetchFaresValidDateRange"],
    returns: "array — one item per terminal combination",
    outputHighlights: [
      "DepartingTerminalID: numeric ID of departure terminal",
      "DepartingDescription: name of departure terminal",
      "ArrivingTerminalID: numeric ID of arrival terminal",
      "ArrivingDescription: name of arrival terminal",
      "CollectionDescription: fare collection procedures for each pair",
      "includes all valid terminal combinations for the date",
    ],
    chaining: [
      "fetchFaresValidDateRange → validate TripDate → call fetchTerminalComboFaresVerbose",
      "fetchTerminalComboFaresVerbose → filter by specific terminals → display collection info",
    ],
  },
} satisfies EndpointMeta<
  TerminalComboFaresVerboseInput,
  TerminalComboFaresVerbose[]
>;

/**
 * Factory result for terminal combo fares verbose
 */
const terminalComboFaresVerboseFactory = createFetchAndHook<
  TerminalComboFaresVerboseInput,
  TerminalComboFaresVerbose[]
>({
  api: wsfFaresApiMeta,
  endpoint: terminalComboFaresVerboseMeta,
  getEndpointGroup: () =>
    require("./shared/terminalCombo.endpoints").terminalComboGroup,
});

/**
 * Fetch function and React Query hook for retrieving fare collection descriptions for all terminal combinations on a trip date
 */
export const {
  fetch: fetchTerminalComboFaresVerbose,
  hook: useTerminalComboFaresVerbose,
} = terminalComboFaresVerboseFactory;
