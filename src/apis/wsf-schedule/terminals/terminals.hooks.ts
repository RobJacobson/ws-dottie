import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalsResource } from "./terminals.endpoints";
import * as fetchFunctions from "./terminals.fetch";
import type {
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesInput,
  TerminalsInput,
} from "./terminals.input";
import type { Terminal, TerminalMate } from "./terminals.output";

const hooks = createHooks(
  wsfScheduleApi,
  scheduleTerminalsResource,
  fetchFunctions
);

export const useTerminals: (
  params?: FetchFunctionParams<TerminalsInput>,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminals;

export const useTerminalsAndMates: (
  params?: FetchFunctionParams<TerminalsAndMatesInput>,
  options?: QueryHookOptions<TerminalMate[]>
) => UseQueryResult<TerminalMate[], Error> = hooks.useTerminalsAndMates;

export const useTerminalsAndMatesByRoute: (
  params?: FetchFunctionParams<TerminalsAndMatesByRouteInput>,
  options?: QueryHookOptions<TerminalMate[]>
) => UseQueryResult<TerminalMate[], Error> = hooks.useTerminalsAndMatesByRoute;
