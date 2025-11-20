import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import { terminalComboGroup } from "./shared/terminalCombo.endpoints";
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
 * Fetch function for retrieving fare collection descriptions for all terminal combinations on a trip date
 */
export const fetchTerminalComboFaresVerbose: FetchFactory<
  TerminalComboFaresVerboseInput,
  TerminalComboFaresVerbose[]
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: terminalComboFaresVerboseMeta,
});

/**
 * React Query hook for retrieving fare collection descriptions for all terminal combinations on a trip date
 */
export const useTerminalComboFaresVerbose: HookFactory<
  TerminalComboFaresVerboseInput,
  TerminalComboFaresVerbose[]
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: terminalComboFaresVerboseMeta.functionName,
  fetchFn: fetchTerminalComboFaresVerbose,
  cacheStrategy: terminalComboGroup.cacheStrategy,
});
