import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalLocationsResource } from "./terminalLocations.endpoints";
import * as fetchFunctions from "./terminalLocations.fetch";
import type {
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
} from "./terminalLocations.input";
import type { TerminalLocation } from "./terminalLocations.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  terminalLocationsResource,
  fetchFunctions
);

export const useTerminalLocations: (
  params?: TerminalLocationsInput,
  options?: QueryHookOptions<TerminalLocation[]>
) => UseQueryResult<TerminalLocation[], Error> = hooks.useTerminalLocations;

export const useTerminalLocationsByTerminalId: (
  params?: TerminalLocationsByIdInput,
  options?: QueryHookOptions<TerminalLocation>
) => UseQueryResult<TerminalLocation, Error> =
  hooks.useTerminalLocationsByTerminalId;
