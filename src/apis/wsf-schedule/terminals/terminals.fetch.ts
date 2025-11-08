import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { scheduleTerminalsResource } from "./terminals.endpoints";
import type {
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesInput,
  TerminalsInput,
} from "./terminals.input";
import type { Terminal, TerminalMate } from "./terminals.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduleTerminalsResource
);

export const fetchTerminals: (
  params?: FetchFunctionParams<TerminalsInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminals;

export const fetchTerminalsAndMates: (
  params?: FetchFunctionParams<TerminalsAndMatesInput>
) => Promise<TerminalMate[]> = fetchFunctions.fetchTerminalsAndMates;

export const fetchTerminalsAndMatesByRoute: (
  params?: FetchFunctionParams<TerminalsAndMatesByRouteInput>
) => Promise<TerminalMate[]> = fetchFunctions.fetchTerminalsAndMatesByRoute;
