import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import { terminalMatesInputSchema } from "@/apis/shared/terminals.input";
import type { TerminalList } from "@/apis/shared/terminals.output";
import { terminalListSchema } from "@/apis/shared/terminals.output";
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
import { scheduleTerminalMatesGroup } from "./shared/terminalMates.endpoints";

/**
 * Metadata for the fetchTerminalMatesSchedule endpoint
 */
export const terminalMatesScheduleMeta = {
  functionName: "fetchTerminalMatesSchedule",
  endpoint: "/terminalmates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  endpointDescription:
    "List valid arriving terminals for a departing terminal and trip date.",
} satisfies EndpointMeta<TerminalMatesInput, TerminalList>;

/**
 * Fetch function for retrieving valid arriving terminals for a departing terminal and trip date
 */
export const fetchTerminalMatesSchedule: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<TerminalList> = createFetchFunction(
  wsfScheduleApi,
  scheduleTerminalMatesGroup,
  terminalMatesScheduleMeta
);

/**
 * React Query hook for retrieving valid arriving terminals for a departing terminal and trip date
 */
export const useTerminalMatesSchedule: (
  params?: FetchFunctionParams<TerminalMatesInput>,
  options?: QueryHookOptions<TerminalList>
) => UseQueryResult<TerminalList, Error> = createHook(
  wsfScheduleApi,
  scheduleTerminalMatesGroup,
  terminalMatesScheduleMeta
);
