import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal transports by terminal ID
 */
const terminalTransportsByTerminalIdFactory = createFetchAndHook<
  TerminalTransportsByTerminalIdInput,
  TerminalTransport
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalTransportsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalTransports.endpoints").terminalTransportsGroup,
});

/**
 * Fetch function and React Query hook for retrieving transportation information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalTransportsByTerminalId,
  hook: useTerminalTransportsByTerminalId,
} = terminalTransportsByTerminalIdFactory;
