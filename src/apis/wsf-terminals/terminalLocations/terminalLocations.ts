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
export const fetchTerminalLocations: FetchFactory<
  TerminalLocationsInput,
  TerminalLocation[]
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalLocationsMeta,
});

/**
 * React Query hook for retrieving location information for all terminals
 */
export const useTerminalLocations: HookFactory<
  TerminalLocationsInput,
  TerminalLocation[]
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalLocationsMeta.functionName,
  fetchFn: fetchTerminalLocations,
  cacheStrategy: terminalLocationsGroup.cacheStrategy,
});
