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
export const fetchTerminalTransportsByTerminalId: (
  params?: FetchFunctionParams<TerminalTransportsByTerminalIdInput>
) => Promise<TerminalTransport> = createFetchFunction(
  apis.wsfTerminals,
  terminalTransportsGroup,
  terminalTransportsByTerminalIdMeta
);

/**
 * React Query hook for retrieving transportation information for a specific terminal by ID
 */
export const useTerminalTransportsByTerminalId: (
  params?: FetchFunctionParams<TerminalTransportsByTerminalIdInput>,
  options?: QueryHookOptions<TerminalTransport>
) => UseQueryResult<TerminalTransport, Error> = createHook(
  apis.wsfTerminals,
  terminalTransportsGroup,
  terminalTransportsByTerminalIdMeta
);
