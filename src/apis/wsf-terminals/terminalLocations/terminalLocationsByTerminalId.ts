import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal locations by terminal ID
 */
const terminalLocationsByTerminalIdFactory = createFetchAndHook<
  TerminalLocationsByIdInput,
  TerminalLocation
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalLocationsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalLocations.endpoints").terminalLocationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving location information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalLocationsByTerminalId,
  hook: useTerminalLocationsByTerminalId,
} = terminalLocationsByTerminalIdFactory;
