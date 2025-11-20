import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchTerminalsAndMates: FetchFactory<
  TerminalsAndMatesInput,
  TerminalMate[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: terminalsAndMatesMeta,
});

/**
 * React Query hook for retrieving all valid terminal pairs for a trip date
 */
export const useTerminalsAndMates: HookFactory<
  TerminalsAndMatesInput,
  TerminalMate[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: terminalsAndMatesMeta.functionName,
  fetchFn: fetchTerminalsAndMates,
  cacheStrategy: scheduleTerminalsGroup.cacheStrategy,
});
