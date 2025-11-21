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
