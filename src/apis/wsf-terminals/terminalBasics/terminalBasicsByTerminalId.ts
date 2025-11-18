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
import { terminalBasicsGroup } from "./shared/terminalBasics.endpoints";
import {
  type TerminalBasicsByIdInput,
  terminalBasicsByIdInputSchema,
} from "./shared/terminalBasics.input";
import {
  type TerminalBasic,
  terminalBasicSchema,
} from "./shared/terminalBasics.output";

/**
 * Metadata for the fetchTerminalBasicsByTerminalId endpoint
 */
export const terminalBasicsByTerminalIdMeta = {
  functionName: "fetchTerminalBasicsByTerminalId",
  endpoint: "/terminalBasics/{TerminalID}",
  inputSchema: terminalBasicsByIdInputSchema,
  outputSchema: terminalBasicSchema,
  sampleParams: { TerminalID: 1 },
  endpointDescription: "Get basic information for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalBasicsByIdInput, TerminalBasic>;

/**
 * Fetch function for retrieving basic information for a specific terminal by ID
 */
export const fetchTerminalBasicsByTerminalId: (
  params?: FetchFunctionParams<TerminalBasicsByIdInput>
) => Promise<TerminalBasic> = createFetchFunction(
  apis.wsfTerminals,
  terminalBasicsGroup,
  terminalBasicsByTerminalIdMeta
);

/**
 * React Query hook for retrieving basic information for a specific terminal by ID
 */
export const useTerminalBasicsByTerminalId: (
  params?: FetchFunctionParams<TerminalBasicsByIdInput>,
  options?: QueryHookOptions<TerminalBasic>
) => UseQueryResult<TerminalBasic, Error> = createHook(
  apis.wsfTerminals,
  terminalBasicsGroup,
  terminalBasicsByTerminalIdMeta
);
