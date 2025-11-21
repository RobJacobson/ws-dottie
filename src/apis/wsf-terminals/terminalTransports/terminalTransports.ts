import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal transports
 */
const terminalTransportsFactory = createFetchAndHook<
  TerminalTransportsInput,
  TerminalTransport[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalTransportsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalTransports.endpoints").terminalTransportsGroup,
});

/**
 * Fetch function and React Query hook for retrieving transportation information for all terminals
 */
export const { fetch: fetchTerminalTransports, hook: useTerminalTransports } =
  terminalTransportsFactory;
