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
  type TerminalWaitTimesInput,
  terminalWaitTimesInputSchema,
} from "./shared/terminalWaitTimes.input";
import {
  type TerminalWaitTime,
  terminalWaitTimeSchema,
} from "./shared/terminalWaitTimes.output";

/**
 * Metadata for the fetchTerminalWaitTimes endpoint
 */
export const terminalWaitTimesMeta = {
  functionName: "fetchTerminalWaitTimes",
  endpoint: "/terminalWaitTimes",
  inputSchema: terminalWaitTimesInputSchema,
  outputSchema: terminalWaitTimeSchema.array(),
  sampleParams: {},
  endpointDescription: "List wait time information for all terminals.",
} satisfies EndpointMeta<TerminalWaitTimesInput, TerminalWaitTime[]>;

/**
 * Fetch function for retrieving wait time information for all terminals
 */
export const fetchTerminalWaitTimes: (
  params?: FetchFunctionParams<TerminalWaitTimesInput>
) => Promise<TerminalWaitTime[]> = createFetchFunction(
  apis.wsfTerminals,
  terminalWaitTimesGroup,
  terminalWaitTimesMeta
);

/**
 * React Query hook for retrieving wait time information for all terminals
 */
export const useTerminalWaitTimes: (
  params?: FetchFunctionParams<TerminalWaitTimesInput>,
  options?: QueryHookOptions<TerminalWaitTime[]>
) => UseQueryResult<TerminalWaitTime[], Error> = createHook(
  apis.wsfTerminals,
  terminalWaitTimesGroup,
  terminalWaitTimesMeta
);

