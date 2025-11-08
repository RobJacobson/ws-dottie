import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfTerminalsApi } from "../apiDefinition";
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
