import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
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
import { scheduleTerminalsGroup } from "./shared/terminals.endpoints";
import {
  type TerminalsInput,
  terminalsInputSchema,
} from "./shared/terminals.input";
import { type Terminal, terminalSchema } from "./shared/terminals.output";

/**
 * Metadata for the fetchTerminals endpoint
 */
export const terminalsMeta = {
  functionName: "fetchTerminals",
  endpoint: "/terminals/{TripDate}",
  inputSchema: terminalsInputSchema,
  outputSchema: terminalSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List valid departing terminals for a trip date.",
} satisfies EndpointMeta<TerminalsInput, Terminal[]>;

/**
 * Fetch function for retrieving valid departing terminals for a trip date
 */
export const fetchTerminals: (
  params?: FetchFunctionParams<TerminalsInput>
) => Promise<Terminal[]> = createFetchFunction(
  wsfScheduleApi.api,
  scheduleTerminalsGroup,
  terminalsMeta
);

/**
 * React Query hook for retrieving valid departing terminals for a trip date
 */
export const useTerminals: (
  params?: FetchFunctionParams<TerminalsInput>,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = createHook(
  wsfScheduleApi.api,
  scheduleTerminalsGroup,
  terminalsMeta
);
