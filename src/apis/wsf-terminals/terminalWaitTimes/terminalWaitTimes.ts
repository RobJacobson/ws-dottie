import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalWaitTimesInput,
  terminalWaitTimesInputSchema,
} from "./shared/terminalWaitTimes.input";
import {
  type TerminalWaitTime,
  terminalWaitTimeSchema,
} from "./shared/terminalWaitTimes.output";

/**
 * Metadata for the fetchTerminalWaitTimes endpoint
 */
export const terminalWaitTimesMeta = {
  functionName: "fetchTerminalWaitTimes",
  endpoint: "/terminalWaitTimes",
  inputSchema: terminalWaitTimesInputSchema,
  outputSchema: terminalWaitTimeSchema.array(),
  sampleParams: {},
  endpointDescription: "List wait time information for all terminals.",
  toolDescription: {
    purpose:
      "List current passenger and vehicle wait time guidance for all terminals in the WSF system.",
    useWhen: [
      "displaying wait time information across all terminals",
      "providing arrival time recommendations for passengers",
      "getting comprehensive wait time overview for planning purposes",
    ],
    avoidWhen: [
      "you only need wait times for one terminal (prefer fetchTerminalWaitTimesByTerminalId)",
      "you're not interested in arrival timing guidance",
    ],
    inputsHighlights: "none",
    returns: "array — one item per terminal",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "WaitTimes array: one or more wait time entries per terminal",
      "Route association: RouteID, RouteName (may be null for general terminal advice)",
      "Wait guidance: WaitTimeNotes (detailed arrival recommendations for vehicles and passengers)",
      "IVR version: WaitTimeIVRNotes (simplified notes for phone systems)",
      "Last updated: WaitTimeLastUpdated timestamp for freshness indication",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalWaitTimesByTerminalId (for single terminal wait times)",
    ],
  },
} satisfies EndpointMeta<TerminalWaitTimesInput, TerminalWaitTime[]>;

/**
 * Factory result for terminal wait times
 */
const terminalWaitTimesFactory = createFetchAndHook<
  TerminalWaitTimesInput,
  TerminalWaitTime[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalWaitTimesMeta,
  getEndpointGroup: () =>
    require("./shared/terminalWaitTimes.endpoints").terminalWaitTimesGroup,
});

/**
 * Fetch function and React Query hook for retrieving wait time information for all terminals
 */
export const { fetch: fetchTerminalWaitTimes, hook: useTerminalWaitTimes } =
  terminalWaitTimesFactory;
