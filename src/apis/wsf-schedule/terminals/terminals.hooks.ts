import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useTerminals = hooks.useTerminals as (
  params?: TerminalsInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error>;

export const useTerminalsAndMates = hooks.useTerminalsAndMates as (
  params?: TerminalsAndMatesInput,
  options?: QueryHookOptions<TerminalMate[]>
) => UseQueryResult<TerminalMate[], Error>;

export const useTerminalsAndMatesByRoute =
  hooks.useTerminalsAndMatesByRoute as (
    params?: TerminalsAndMatesByRouteInput,
    options?: QueryHookOptions<TerminalMate[]>
  ) => UseQueryResult<TerminalMate[], Error>;
