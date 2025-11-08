import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import { terminalLocationsResource } from "./terminalLocations.endpoints";
import * as fetchFunctions from "./terminalLocations.fetch";
import type {
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
} from "./terminalLocations.input";
import type { TerminalLocation } from "./terminalLocations.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalLocationsResource,
  fetchFunctions
);

export const useTerminalLocations: (
  params?: FetchFunctionParams<TerminalLocationsInput>,
  options?: QueryHookOptions<TerminalLocation[]>
) => UseQueryResult<TerminalLocation[], Error> = hooks.useTerminalLocations;

export const useTerminalLocationsByTerminalId: (
  params?: FetchFunctionParams<TerminalLocationsByIdInput>,
  options?: QueryHookOptions<TerminalLocation>
) => UseQueryResult<TerminalLocation, Error> =
  hooks.useTerminalLocationsByTerminalId;
