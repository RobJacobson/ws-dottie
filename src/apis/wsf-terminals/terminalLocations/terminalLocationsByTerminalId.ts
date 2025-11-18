import type { UseQueryResult } from "@tanstack/react-query";
import { wsfTerminalsApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { terminalLocationsGroup } from "./shared/terminalLocations.endpoints";
import {
  type TerminalLocationsByIdInput,
  terminalLocationsByIdInputSchema,
} from "./shared/terminalLocations.input";
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "./shared/terminalLocations.output";

/**
 * Metadata for the fetchTerminalLocationsByTerminalId endpoint
 */
export const terminalLocationsByTerminalIdMeta = {
  functionName: "fetchTerminalLocationsByTerminalId",
  endpoint: "/terminalLocations/{TerminalID}",
  inputSchema: terminalLocationsByIdInputSchema,
  outputSchema: terminalLocationSchema,
  sampleParams: { TerminalID: 5 },
  endpointDescription:
    "Get location information for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalLocationsByIdInput, TerminalLocation>;

/**
 * Fetch function for retrieving location information for a specific terminal by ID
 */
export const fetchTerminalLocationsByTerminalId: (
  params?: FetchFunctionParams<TerminalLocationsByIdInput>
) => Promise<TerminalLocation> = createFetchFunction(
  wsfTerminalsApi,
  terminalLocationsGroup,
  terminalLocationsByTerminalIdMeta
);

/**
 * React Query hook for retrieving location information for a specific terminal by ID
 */
export const useTerminalLocationsByTerminalId: (
  params?: FetchFunctionParams<TerminalLocationsByIdInput>,
  options?: QueryHookOptions<TerminalLocation>
) => UseQueryResult<TerminalLocation, Error> = createHook(
  wsfTerminalsApi,
  terminalLocationsGroup,
  terminalLocationsByTerminalIdMeta
);
