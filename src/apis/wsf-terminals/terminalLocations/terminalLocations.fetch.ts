import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalLocationsResource } from "./terminalLocations.endpoints";
import type {
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
} from "./terminalLocations.input";
import type { TerminalLocation } from "./terminalLocations.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  terminalLocationsResource
);

export const fetchTerminalLocations: (
  params?: FetchFunctionParams<TerminalLocationsInput>
) => Promise<TerminalLocation[]> = fetchFunctions.fetchTerminalLocations;

export const fetchTerminalLocationsByTerminalId: (
  params?: FetchFunctionParams<TerminalLocationsByIdInput>
) => Promise<TerminalLocation> =
  fetchFunctions.fetchTerminalLocationsByTerminalId;
