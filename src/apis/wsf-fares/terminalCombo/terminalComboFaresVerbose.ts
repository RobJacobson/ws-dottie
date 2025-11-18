import type { UseQueryResult } from "@tanstack/react-query";
import { wsfFaresApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
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
export const fetchTerminalComboFaresVerbose: (
  params?: FetchFunctionParams<TerminalComboFaresVerboseInput>
) => Promise<TerminalComboFaresVerbose[]> = createFetchFunction(
  wsfFaresApi,
  terminalComboGroup,
  terminalComboFaresVerboseMeta
);

/**
 * React Query hook for retrieving fare collection descriptions for all terminal combinations on a trip date
 */
export const useTerminalComboFaresVerbose: (
  params?: FetchFunctionParams<TerminalComboFaresVerboseInput>,
  options?: QueryHookOptions<TerminalComboFaresVerbose[]>
) => UseQueryResult<TerminalComboFaresVerbose[], Error> = createHook(
  wsfFaresApi,
  terminalComboGroup,
  terminalComboFaresVerboseMeta
);
