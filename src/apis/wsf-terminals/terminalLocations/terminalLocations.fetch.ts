import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { terminalLocationsResource } from "./terminalLocations.endpoints";
import type {
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
} from "./terminalLocations.input";
import type { TerminalLocation } from "./terminalLocations.output";

const fetchFunctions = createFetchFunctions(
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
