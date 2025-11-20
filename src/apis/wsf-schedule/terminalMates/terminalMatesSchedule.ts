import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import { terminalMatesInputSchema } from "@/apis/shared/terminals.input";
import type { TerminalList } from "@/apis/shared/terminals.output";
import { terminalListSchema } from "@/apis/shared/terminals.output";
import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchTerminalMatesSchedule: FetchFactory<
  TerminalMatesInput,
  TerminalList
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: terminalMatesScheduleMeta,
});

/**
 * React Query hook for retrieving valid arriving terminals for a departing terminal and trip date
 */
export const useTerminalMatesSchedule: HookFactory<
  TerminalMatesInput,
  TerminalList
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: terminalMatesScheduleMeta.functionName,
  fetchFn: fetchTerminalMatesSchedule,
  cacheStrategy: scheduleTerminalMatesGroup.cacheStrategy,
});
