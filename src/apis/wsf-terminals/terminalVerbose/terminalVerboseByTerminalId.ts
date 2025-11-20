import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import { terminalVerboseGroup } from "./shared/terminalVerbose.endpoints";
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
 * Fetch function for retrieving comprehensive information for a specific terminal by ID
 */
export const fetchTerminalVerboseByTerminalId: FetchFactory<
  TerminalVerboseByTerminalIdInput,
  TerminalVerbose
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalVerboseByTerminalIdMeta,
});

/**
 * React Query hook for retrieving comprehensive information for a specific terminal by ID
 */
export const useTerminalVerboseByTerminalId: HookFactory<
  TerminalVerboseByTerminalIdInput,
  TerminalVerbose
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalVerboseByTerminalIdMeta.functionName,
  fetchFn: fetchTerminalVerboseByTerminalId,
  cacheStrategy: terminalVerboseGroup.cacheStrategy,
});
