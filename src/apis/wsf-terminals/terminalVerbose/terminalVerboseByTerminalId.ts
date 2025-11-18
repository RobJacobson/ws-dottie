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
export const fetchTerminalVerboseByTerminalId: (
  params?: FetchFunctionParams<TerminalVerboseByTerminalIdInput>
) => Promise<TerminalVerbose> = createFetchFunction(
  apis.wsfTerminals,
  terminalVerboseGroup,
  terminalVerboseByTerminalIdMeta
);

/**
 * React Query hook for retrieving comprehensive information for a specific terminal by ID
 */
export const useTerminalVerboseByTerminalId: (
  params?: FetchFunctionParams<TerminalVerboseByTerminalIdInput>,
  options?: QueryHookOptions<TerminalVerbose>
) => UseQueryResult<TerminalVerbose, Error> = createHook(
  apis.wsfTerminals,
  terminalVerboseGroup,
  terminalVerboseByTerminalIdMeta
);
