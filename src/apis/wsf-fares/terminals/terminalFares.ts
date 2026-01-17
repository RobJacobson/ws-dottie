import {
  type TerminalsInput,
  terminalsInputSchema,
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
 * Metadata for the fetchTerminalFares endpoint
 */
export const terminalFaresMeta = {
  functionName: "fetchTerminalFares",
  endpoint: "/terminals/{TripDate}",
  inputSchema: terminalsInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List valid departing terminals for a trip date.",
  toolDescription: {
    purpose: "List all valid departing terminals for a specific trip date.",
    useWhen: [
      "building departure terminal selection interfaces",
      "discovering available ferry routes for a date",
      "validating terminal IDs before fare queries",
    ],
    avoidWhen: [
      "you only need one terminal (prefer fetchTerminalMatesFares for terminal relationships)",
    ],
    inputs: ["TripDate: YYYY-MM-DD format, from fetchFaresValidDateRange"],
    returns: "array — one item per departing terminal",
    outputHighlights: [
      "TerminalID: numeric identifier for the terminal",
      "Description: human-readable terminal name",
      "includes all terminals with ferry service on the specified date",
      "use TerminalID for other fare and schedule endpoints",
    ],
    chaining: [
      "fetchFaresValidDateRange → validate TripDate → call fetchTerminalFares",
      "fetchTerminalFares → extract TerminalID → call fetchTerminalMatesFares",
    ],
  },
} satisfies EndpointMeta<TerminalsInput, TerminalList>;

/**
 * Factory result for terminal fares
 */
const terminalFaresFactory = createFetchAndHook<TerminalsInput, TerminalList>({
  api: wsfFaresApiMeta,
  endpoint: terminalFaresMeta,
  getEndpointGroup: () =>
    require("./shared/terminals.endpoints").terminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving valid departing terminals for a trip date
 */
export const { fetch: fetchTerminalFares, hook: useTerminalFares } =
  terminalFaresFactory;
