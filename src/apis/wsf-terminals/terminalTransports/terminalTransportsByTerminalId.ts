import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import { terminalTransportsGroup } from "./shared/terminalTransports.endpoints";
import {
  type TerminalTransportsByTerminalIdInput,
  terminalTransportsByTerminalIdInputSchema,
} from "./shared/terminalTransports.input";
import {
  type TerminalTransport,
  terminalTransportSchema,
} from "./shared/terminalTransports.output";

/**
 * Metadata for the fetchTerminalTransportsByTerminalId endpoint
 */
export const terminalTransportsByTerminalIdMeta = {
  functionName: "fetchTerminalTransportsByTerminalId",
  endpoint: "/terminalTransports/{TerminalID}",
  inputSchema: terminalTransportsByTerminalIdInputSchema,
  outputSchema: terminalTransportSchema,
  sampleParams: { TerminalID: 10 },
  endpointDescription:
    "Get transportation information for a specific terminal by ID.",
} satisfies EndpointMeta<
  TerminalTransportsByTerminalIdInput,
  TerminalTransport
>;

/**
 * Fetch function for retrieving transportation information for a specific terminal by ID
 */
export const fetchTerminalTransportsByTerminalId: FetchFactory<
  TerminalTransportsByTerminalIdInput,
  TerminalTransport
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalTransportsByTerminalIdMeta,
});

/**
 * React Query hook for retrieving transportation information for a specific terminal by ID
 */
export const useTerminalTransportsByTerminalId: HookFactory<
  TerminalTransportsByTerminalIdInput,
  TerminalTransport
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalTransportsByTerminalIdMeta.functionName,
  fetchFn: fetchTerminalTransportsByTerminalId,
  cacheStrategy: terminalTransportsGroup.cacheStrategy,
});
