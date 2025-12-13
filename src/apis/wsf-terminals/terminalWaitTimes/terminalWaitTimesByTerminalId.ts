import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalWaitTimesByIdInput,
  terminalWaitTimesByIdInputSchema,
} from "./shared/terminalWaitTimes.input";
import {
  type TerminalWaitTime,
  terminalWaitTimeSchema,
} from "./shared/terminalWaitTimes.output";

/**
 * Metadata for the fetchTerminalWaitTimesByTerminalId endpoint
 */
export const terminalWaitTimesByTerminalIdMeta = {
  functionName: "fetchTerminalWaitTimesByTerminalId",
  endpoint: "/terminalWaitTimes/{TerminalID}",
  inputSchema: terminalWaitTimesByIdInputSchema,
  outputSchema: terminalWaitTimeSchema,
  sampleParams: { TerminalID: 11 },
  endpointDescription:
    "Get wait time information for a specific terminal by ID.",
  toolDescription: {
    purpose:
      "Get current passenger and vehicle wait time guidance for a single terminal by its TerminalID.",
    useWhen: [
      "getting arrival time recommendations for a specific terminal",
      "displaying wait time information for one location",
      "minimizing payload when you only need wait times for one terminal",
    ],
    avoidWhen: [
      "you don't know the TerminalID (prefer fetchTerminalBasics to discover IDs)",
      "you need wait times for multiple terminals (prefer fetchTerminalWaitTimes)",
    ],
    inputs: ["TerminalID: get it from fetchTerminalBasics → TerminalID"],
    returns: "object — one terminal with wait time information",
    outputHighlights: [
      "Terminal info: TerminalID, TerminalName, TerminalAbbrev (same as terminalBasics)",
      "WaitTimes array: one or more wait time entries for this terminal",
      "Route association: RouteID, RouteName (may be null for general terminal advice)",
      "Wait guidance: WaitTimeNotes (detailed arrival recommendations for vehicles and passengers)",
      "IVR version: WaitTimeIVRNotes (simplified notes for phone systems)",
      "Last updated: WaitTimeLastUpdated timestamp for freshness indication",
    ],
    chaining: [
      "fetchTerminalBasics → extract TerminalID → call fetchTerminalWaitTimesByTerminalId",
    ],
  },
} satisfies EndpointMeta<TerminalWaitTimesByIdInput, TerminalWaitTime>;

/**
 * Factory result for terminal wait times by terminal ID
 */
const terminalWaitTimesByTerminalIdFactory = createFetchAndHook<
  TerminalWaitTimesByIdInput,
  TerminalWaitTime
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalWaitTimesByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalWaitTimes.endpoints").terminalWaitTimesGroup,
});

/**
 * Fetch function and React Query hook for retrieving wait time information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalWaitTimesByTerminalId,
  hook: useTerminalWaitTimesByTerminalId,
} = terminalWaitTimesByTerminalIdFactory;
