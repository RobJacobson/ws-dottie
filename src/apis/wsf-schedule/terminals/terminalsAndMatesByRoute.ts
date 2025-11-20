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
  type TerminalsAndMatesByRouteInput,
  terminalsAndMatesByRouteInputSchema,
} from "./shared/terminals.input";
import {
  type TerminalMate,
  terminalMateSchema,
} from "./shared/terminals.output";

/**
 * Metadata for the fetchTerminalsAndMatesByRoute endpoint
 */
export const terminalsAndMatesByRouteMeta = {
  functionName: "fetchTerminalsAndMatesByRoute",
  endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
  inputSchema: terminalsAndMatesByRouteInputSchema,
  outputSchema: terminalMateSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
  endpointDescription:
    "List valid terminal pairs for a specific route and trip date.",
} satisfies EndpointMeta<TerminalsAndMatesByRouteInput, TerminalMate[]>;

/**
 * Fetch function for retrieving valid terminal pairs for a specific route and trip date
 */
export const fetchTerminalsAndMatesByRoute: FetchFactory<
  TerminalsAndMatesByRouteInput,
  TerminalMate[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: terminalsAndMatesByRouteMeta,
});

/**
 * React Query hook for retrieving valid terminal pairs for a specific route and trip date
 */
export const useTerminalsAndMatesByRoute: HookFactory<
  TerminalsAndMatesByRouteInput,
  TerminalMate[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: terminalsAndMatesByRouteMeta.functionName,
  fetchFn: fetchTerminalsAndMatesByRoute,
  cacheStrategy: scheduleTerminalsGroup.cacheStrategy,
});
