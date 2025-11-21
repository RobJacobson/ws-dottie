import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal locations
 */
const terminalLocationsFactory = createFetchAndHook<
  TerminalLocationsInput,
  TerminalLocation[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalLocationsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalLocations.endpoints").terminalLocationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving location information for all terminals
 */
export const { fetch: fetchTerminalLocations, hook: useTerminalLocations } =
  terminalLocationsFactory;
