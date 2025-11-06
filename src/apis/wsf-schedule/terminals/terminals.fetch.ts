import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalsResource } from "./terminals.endpoints";
import type {
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesInput,
  TerminalsInput,
} from "./terminals.input";
import type { Terminal, TerminalMate } from "./terminals.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleTerminalsResource
);

export const fetchTerminals = fetchFunctions.fetchTerminals as (
  params?: FetchFunctionParams<TerminalsInput>
) => Promise<Terminal[]>;

export const fetchTerminalsAndMates = fetchFunctions.fetchTerminalsAndMates as (
  params?: FetchFunctionParams<TerminalsAndMatesInput>
) => Promise<TerminalMate[]>;

export const fetchTerminalsAndMatesByRoute =
  fetchFunctions.fetchTerminalsAndMatesByRoute as (
    params?: FetchFunctionParams<TerminalsAndMatesByRouteInput>
  ) => Promise<TerminalMate[]>;
