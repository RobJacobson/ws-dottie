import type { UseQueryResult } from "@tanstack/react-query";
import { wsfFaresApi } from "../api";
import {
  type TerminalsInput,
  terminalsInputSchema,
} from "@/apis/shared/terminals.input";
import {
  type TerminalList,
  terminalListSchema,
} from "@/apis/shared/terminals.output";
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
import { terminalsGroup } from "./shared/terminals.endpoints";

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
} satisfies EndpointMeta<TerminalsInput, TerminalList>;

/**
 * Fetch function for retrieving valid departing terminals for a trip date
 */
export const fetchTerminalFares: (
  params?: FetchFunctionParams<TerminalsInput>
) => Promise<TerminalList> = createFetchFunction(
  wsfFaresApi,
  terminalsGroup,
  terminalFaresMeta
);

/**
 * React Query hook for retrieving valid departing terminals for a trip date
 */
export const useTerminalFares: (
  params?: FetchFunctionParams<TerminalsInput>,
  options?: QueryHookOptions<TerminalList>
) => UseQueryResult<TerminalList, Error> = createHook(
  wsfFaresApi,
  terminalsGroup,
  terminalFaresMeta
);
