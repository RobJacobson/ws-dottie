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
import { terminalWaitTimesGroup } from "./shared/terminalWaitTimes.endpoints";
import {
  type TerminalWaitTimesByIdInput,
  terminalWaitTimesByIdInputSchema,
} from "./shared/terminalWaitTimes.input";
import {
  type TerminalWaitTime,
  terminalWaitTimeSchema,
} from "./shared/terminalWaitTimes.output";

/**
 * Metadata for the fetchTerminalWaitTimesByTerminalId endpoint
 */
export const terminalWaitTimesByTerminalIdMeta = {
  functionName: "fetchTerminalWaitTimesByTerminalId",
  endpoint: "/terminalWaitTimes/{TerminalID}",
  inputSchema: terminalWaitTimesByIdInputSchema,
  outputSchema: terminalWaitTimeSchema,
  sampleParams: { TerminalID: 11 },
  endpointDescription:
    "Get wait time information for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalWaitTimesByIdInput, TerminalWaitTime>;

/**
 * Fetch function for retrieving wait time information for a specific terminal by ID
 */
export const fetchTerminalWaitTimesByTerminalId: (
  params?: FetchFunctionParams<TerminalWaitTimesByIdInput>
) => Promise<TerminalWaitTime> = createFetchFunction(
  apis.wsfTerminals,
  terminalWaitTimesGroup,
  terminalWaitTimesByTerminalIdMeta
);

/**
 * React Query hook for retrieving wait time information for a specific terminal by ID
 */
export const useTerminalWaitTimesByTerminalId: (
  params?: FetchFunctionParams<TerminalWaitTimesByIdInput>,
  options?: QueryHookOptions<TerminalWaitTime>
) => UseQueryResult<TerminalWaitTime, Error> = createHook(
  apis.wsfTerminals,
  terminalWaitTimesGroup,
  terminalWaitTimesByTerminalIdMeta
);
