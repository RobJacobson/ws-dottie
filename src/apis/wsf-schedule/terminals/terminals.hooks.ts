import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalsResource } from "./terminals.endpoints";
import * as fetchFunctions from "./terminals.fetch";
import type {
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesInput,
  TerminalsInput,
} from "./terminals.input";
import type { Terminal, TerminalMate } from "./terminals.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleTerminalsResource,
  fetchFunctions
);

export const useTerminals: (
  params?: TerminalsInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminals;

export const useTerminalsAndMates: (
  params?: TerminalsAndMatesInput,
  options?: QueryHookOptions<TerminalMate[]>
) => UseQueryResult<TerminalMate[], Error> = hooks.useTerminalsAndMates;

export const useTerminalsAndMatesByRoute: (
  params?: TerminalsAndMatesByRouteInput,
  options?: QueryHookOptions<TerminalMate[]>
) => UseQueryResult<TerminalMate[], Error> = hooks.useTerminalsAndMatesByRoute;
