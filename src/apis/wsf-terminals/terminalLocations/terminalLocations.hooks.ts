import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfTerminalsApi } from "../apiDefinition";
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
