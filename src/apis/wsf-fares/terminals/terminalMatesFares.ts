import type { UseQueryResult } from "@tanstack/react-query";
import { wsfFaresApi } from "../api";
import {
  type TerminalMatesInput,
  terminalMatesInputSchema,
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
} satisfies EndpointMeta<TerminalMatesInput, TerminalList>;

/**
 * Fetch function for retrieving arriving terminals for a given departing terminal and trip date
 */
export const fetchTerminalMatesFares: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<TerminalList> = createFetchFunction(
  wsfFaresApi.api,
  terminalsGroup,
  terminalMatesFaresMeta
);

/**
 * React Query hook for retrieving arriving terminals for a given departing terminal and trip date
 */
export const useTerminalMatesFares: (
  params?: FetchFunctionParams<TerminalMatesInput>,
  options?: QueryHookOptions<TerminalList>
) => UseQueryResult<TerminalList, Error> = createHook(
  wsfFaresApi.api,
  terminalsGroup,
  terminalMatesFaresMeta
);
