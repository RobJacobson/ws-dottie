import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
export const fetchTerminalLocationsByTerminalId: FetchFactory<
  TerminalLocationsByIdInput,
  TerminalLocation
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalLocationsByTerminalIdMeta,
});

/**
 * React Query hook for retrieving location information for a specific terminal by ID
 */
export const useTerminalLocationsByTerminalId: HookFactory<
  TerminalLocationsByIdInput,
  TerminalLocation
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalLocationsByTerminalIdMeta.functionName,
  fetchFn: fetchTerminalLocationsByTerminalId,
  cacheStrategy: terminalLocationsGroup.cacheStrategy,
});
