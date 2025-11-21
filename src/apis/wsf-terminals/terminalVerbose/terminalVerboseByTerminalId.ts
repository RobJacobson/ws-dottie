import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalVerboseByTerminalIdInput,
  terminalVerboseByTerminalIdInputSchema,
} from "./shared/terminalVerbose.input";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "./shared/terminalVerbose.output";

/**
 * Metadata for the fetchTerminalVerboseByTerminalId endpoint
 */
export const terminalVerboseByTerminalIdMeta = {
  functionName: "fetchTerminalVerboseByTerminalId",
  endpoint: "/terminalVerbose/{TerminalID}",
  inputSchema: terminalVerboseByTerminalIdInputSchema,
  outputSchema: terminalVerboseSchema,
  sampleParams: { TerminalID: 4 },
  endpointDescription:
    "Get comprehensive information for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalVerboseByTerminalIdInput, TerminalVerbose>;

/**
 * Factory result for terminal verbose by terminal ID
 */
const terminalVerboseByTerminalIdFactory = createFetchAndHook<
  TerminalVerboseByTerminalIdInput,
  TerminalVerbose
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalVerboseByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalVerbose.endpoints").terminalVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving comprehensive information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalVerboseByTerminalId,
  hook: useTerminalVerboseByTerminalId,
} = terminalVerboseByTerminalIdFactory;
