import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
import { datesHelper } from "@/shared/utils";
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
export const fetchTerminalsAndMatesByRoute: (
  params?: FetchFunctionParams<TerminalsAndMatesByRouteInput>
) => Promise<TerminalMate[]> = createFetchFunction(
  apis.wsfSchedule,
  scheduleTerminalsGroup,
  terminalsAndMatesByRouteMeta
);

/**
 * React Query hook for retrieving valid terminal pairs for a specific route and trip date
 */
export const useTerminalsAndMatesByRoute: (
  params?: FetchFunctionParams<TerminalsAndMatesByRouteInput>,
  options?: QueryHookOptions<TerminalMate[]>
) => UseQueryResult<TerminalMate[], Error> = createHook(
  apis.wsfSchedule,
  scheduleTerminalsGroup,
  terminalsAndMatesByRouteMeta
);
