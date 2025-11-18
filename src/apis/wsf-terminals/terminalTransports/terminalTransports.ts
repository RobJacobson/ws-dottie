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
} from "@/shared/factories/metaEndpointFactory";
import { terminalTransportsGroup } from "./shared/terminalTransports.endpoints";
import {
  type TerminalTransportsInput,
  terminalTransportsInputSchema,
} from "./shared/terminalTransports.input";
import {
  type TerminalTransport,
  terminalTransportSchema,
} from "./shared/terminalTransports.output";

/**
 * Metadata for the fetchTerminalTransports endpoint
 */
export const terminalTransportsMeta = {
  functionName: "fetchTerminalTransports",
  endpoint: "/terminalTransports",
  inputSchema: terminalTransportsInputSchema,
  outputSchema: terminalTransportSchema.array(),
  sampleParams: {},
  endpointDescription: "List transportation information for all terminals.",
} satisfies EndpointMeta<TerminalTransportsInput, TerminalTransport[]>;

/**
 * Fetch function for retrieving transportation information for all terminals
 */
export const fetchTerminalTransports: (
  params?: FetchFunctionParams<TerminalTransportsInput>
) => Promise<TerminalTransport[]> = createFetchFunction(
  apis.wsfTerminals,
  terminalTransportsGroup,
  terminalTransportsMeta
);

/**
 * React Query hook for retrieving transportation information for all terminals
 */
export const useTerminalTransports: (
  params?: FetchFunctionParams<TerminalTransportsInput>,
  options?: QueryHookOptions<TerminalTransport[]>
) => UseQueryResult<TerminalTransport[], Error> = createHook(
  apis.wsfTerminals,
  terminalTransportsGroup,
  terminalTransportsMeta
);
