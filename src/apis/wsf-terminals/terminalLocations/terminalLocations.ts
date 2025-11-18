import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
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
  type TerminalLocationsInput,
  terminalLocationsInputSchema,
} from "./shared/terminalLocations.input";
import {
  type TerminalLocation,
  terminalLocationSchema,
} from "./shared/terminalLocations.output";

/**
 * Metadata for the fetchTerminalLocations endpoint
 */
export const terminalLocationsMeta = {
  functionName: "fetchTerminalLocations",
  endpoint: "/terminalLocations",
  inputSchema: terminalLocationsInputSchema,
  outputSchema: terminalLocationSchema.array(),
  sampleParams: {},
  endpointDescription: "List location information for all terminals.",
} satisfies EndpointMeta<TerminalLocationsInput, TerminalLocation[]>;

/**
 * Fetch function for retrieving location information for all terminals
 */
export const fetchTerminalLocations: (
  params?: FetchFunctionParams<TerminalLocationsInput>
) => Promise<TerminalLocation[]> = createFetchFunction(
  apis.wsfTerminals,
  terminalLocationsGroup,
  terminalLocationsMeta
);

/**
 * React Query hook for retrieving location information for all terminals
 */
export const useTerminalLocations: (
  params?: FetchFunctionParams<TerminalLocationsInput>,
  options?: QueryHookOptions<TerminalLocation[]>
) => UseQueryResult<TerminalLocation[], Error> = createHook(
  apis.wsfTerminals,
  terminalLocationsGroup,
  terminalLocationsMeta
);
