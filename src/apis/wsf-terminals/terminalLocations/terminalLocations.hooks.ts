import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useTerminalLocations = hooks.useTerminalLocations as (
  params?: TerminalLocationsInput,
  options?: QueryHookOptions<TerminalLocation[]>
) => UseQueryResult<TerminalLocation[], Error>;

export const useTerminalLocationsByTerminalId =
  hooks.useTerminalLocationsByTerminalId as (
    params?: TerminalLocationsByIdInput,
    options?: QueryHookOptions<TerminalLocation>
  ) => UseQueryResult<TerminalLocation, Error>;
