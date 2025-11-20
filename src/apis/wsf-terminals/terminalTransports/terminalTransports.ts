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
export const fetchTerminalTransports: FetchFactory<
  TerminalTransportsInput,
  TerminalTransport[]
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalTransportsMeta,
});

/**
 * React Query hook for retrieving transportation information for all terminals
 */
export const useTerminalTransports: HookFactory<
  TerminalTransportsInput,
  TerminalTransport[]
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalTransportsMeta.functionName,
  fetchFn: fetchTerminalTransports,
  cacheStrategy: terminalTransportsGroup.cacheStrategy,
});
