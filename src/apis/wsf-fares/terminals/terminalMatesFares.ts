import {
  type TerminalMatesInput,
  terminalMatesInputSchema,
} from "@/apis/shared/terminals.input";
import {
  type TerminalList,
  terminalListSchema,
} from "@/apis/shared/terminals.output";
import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";

/**
 * Metadata for the fetchTerminalMatesFares endpoint
 */
export const terminalMatesFaresMeta = {
  functionName: "fetchTerminalMatesFares",
  endpoint: "/terminalMates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  endpointDescription:
    "List arriving terminals for a given departing terminal and trip date.",
  toolDescription: {
    purpose:
      "List all valid arriving terminals for a specific departing terminal and trip date.",
    useWhen: [
      "discovering ferry routes from a specific departure terminal",
      "building arrival terminal selection for a chosen departure",
      "validating terminal pair combinations",
    ],
    avoidWhen: [
      "you need all terminals (prefer fetchTerminalFares for complete terminal list)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format",
      "TerminalID: from fetchTerminalFares → TerminalID",
    ],
    returns: "array — one item per arriving terminal",
    outputHighlights: [
      "TerminalID: numeric identifier for arriving terminals",
      "Description: human-readable terminal names",
      "only terminals reachable from the specified departing terminal",
      "use for building route selection interfaces",
    ],
    chaining: [
      "fetchTerminalFares → extract TerminalID → call fetchTerminalMatesFares",
      "fetchTerminalMatesFares → extract TerminalID → call fare calculation endpoints",
    ],
  },
} satisfies EndpointMeta<TerminalMatesInput, TerminalList>;

/**
 * Factory result for terminal mates fares
 */
const terminalMatesFaresFactory = createFetchAndHook<
  TerminalMatesInput,
  TerminalList
>({
  api: wsfFaresApiMeta,
  endpoint: terminalMatesFaresMeta,
  getEndpointGroup: () =>
    require("./shared/terminals.endpoints").terminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving arriving terminals for a given departing terminal and trip date
 */
export const { fetch: fetchTerminalMatesFares, hook: useTerminalMatesFares } =
  terminalMatesFaresFactory;
