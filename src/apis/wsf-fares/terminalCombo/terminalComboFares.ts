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
} satisfies EndpointMeta<TerminalComboInput, TerminalComboFares>;

/**
 * Fetch function for retrieving fare collection description for a specific terminal combination and trip date
 */
export const fetchTerminalComboFares: (
  params?: FetchFunctionParams<TerminalComboInput>
) => Promise<TerminalComboFares> = createFetchFunction(
  wsfFaresApi.api,
  terminalComboGroup,
  terminalComboFaresMeta
);

/**
 * React Query hook for retrieving fare collection description for a specific terminal combination and trip date
 */
export const useTerminalComboFares: (
  params?: FetchFunctionParams<TerminalComboInput>,
  options?: QueryHookOptions<TerminalComboFares>
) => UseQueryResult<TerminalComboFares, Error> = createHook(
  wsfFaresApi.api,
  terminalComboGroup,
  terminalComboFaresMeta
);
