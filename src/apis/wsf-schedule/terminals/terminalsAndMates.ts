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
  type TerminalsAndMatesInput,
  terminalsAndMatesInputSchema,
} from "./shared/terminals.input";
import {
  type TerminalMate,
  terminalMateSchema,
} from "./shared/terminals.output";

/**
 * Metadata for the fetchTerminalsAndMates endpoint
 */
export const terminalsAndMatesMeta = {
  functionName: "fetchTerminalsAndMates",
  endpoint: "/terminalsandmates/{TripDate}",
  inputSchema: terminalsAndMatesInputSchema,
  outputSchema: terminalMateSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List all valid terminal pairs for a trip date.",
} satisfies EndpointMeta<TerminalsAndMatesInput, TerminalMate[]>;

/**
 * Fetch function for retrieving all valid terminal pairs for a trip date
 */
export const fetchTerminalsAndMates: (
  params?: FetchFunctionParams<TerminalsAndMatesInput>
) => Promise<TerminalMate[]> = createFetchFunction(
  wsfScheduleApi.api,
  scheduleTerminalsGroup,
  terminalsAndMatesMeta
);

/**
 * React Query hook for retrieving all valid terminal pairs for a trip date
 */
export const useTerminalsAndMates: (
  params?: FetchFunctionParams<TerminalsAndMatesInput>,
  options?: QueryHookOptions<TerminalMate[]>
) => UseQueryResult<TerminalMate[], Error> = createHook(
  wsfScheduleApi.api,
  scheduleTerminalsGroup,
  terminalsAndMatesMeta
);
