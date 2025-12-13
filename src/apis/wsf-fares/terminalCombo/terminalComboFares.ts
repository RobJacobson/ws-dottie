import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import {
  type TerminalComboInput,
  terminalComboInputSchema,
} from "./shared/terminalCombo.input";
import {
  type TerminalComboFares,
  terminalComboFaresSchema,
} from "./shared/terminalCombo.output";

/**
 * Metadata for the fetchTerminalComboFares endpoint
 */
export const terminalComboFaresMeta = {
  functionName: "fetchTerminalComboFares",
  endpoint:
    "/terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: terminalComboInputSchema,
  outputSchema: terminalComboFaresSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription:
    "Get fare collection description for a specific terminal combination and trip date.",
  toolDescription: {
    purpose:
      "Get fare collection procedures for a specific terminal pair and trip date.",
    useWhen: [
      "determining where and how fares are collected for a route",
      "building fare payment instructions for users",
      "understanding fare collection logistics for trip planning",
    ],
    avoidWhen: [
      "you need all terminal combinations (prefer fetchTerminalComboFaresVerbose)",
    ],
    inputsHighlights:
      "TripDate in YYYY-MM-DD format; DepartingTerminalID, ArrivingTerminalID (from terminal endpoints)",
    returns: "object — fare collection information for one terminal pair",
    outputHighlights: [
      "DepartingDescription: name of departure terminal",
      "ArrivingDescription: name of arrival terminal",
      "CollectionDescription: detailed text about fare collection procedures",
      "describes which terminals collect fares and payment requirements",
    ],
    chaining: [
      "fetchTerminalMatesFares → extract ArrivingTerminalID → call fetchTerminalComboFares",
      "fetchTerminalComboFares → display collection procedures to user",
    ],
  },
} satisfies EndpointMeta<TerminalComboInput, TerminalComboFares>;

/**
 * Factory result for terminal combo fares
 */
const terminalComboFaresFactory = createFetchAndHook<
  TerminalComboInput,
  TerminalComboFares
>({
  api: wsfFaresApiMeta,
  endpoint: terminalComboFaresMeta,
  getEndpointGroup: () =>
    require("./shared/terminalCombo.endpoints").terminalComboGroup,
});

/**
 * Fetch function and React Query hook for retrieving fare collection description for a specific terminal combination and trip date
 */
export const { fetch: fetchTerminalComboFares, hook: useTerminalComboFares } =
  terminalComboFaresFactory;
