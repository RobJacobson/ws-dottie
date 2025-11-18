import type { UseQueryResult } from "@tanstack/react-query";
import { wsfTerminalsApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { terminalVerboseGroup } from "./shared/terminalVerbose.endpoints";
import {
  type TerminalVerboseInput,
  terminalVerboseInputSchema,
} from "./shared/terminalVerbose.input";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "./shared/terminalVerbose.output";

/**
 * Metadata for the fetchTerminalVerbose endpoint
 */
export const terminalVerboseMeta = {
  functionName: "fetchTerminalVerbose",
  endpoint: "/terminalVerbose",
  inputSchema: terminalVerboseInputSchema,
  outputSchema: terminalVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List comprehensive information for all terminals.",
} satisfies EndpointMeta<TerminalVerboseInput, TerminalVerbose[]>;

/**
 * Fetch function for retrieving comprehensive information for all terminals
 */
export const fetchTerminalVerbose: (
  params?: FetchFunctionParams<TerminalVerboseInput>
) => Promise<TerminalVerbose[]> = createFetchFunction(
  wsfTerminalsApi,
  terminalVerboseGroup,
  terminalVerboseMeta
);

/**
 * React Query hook for retrieving comprehensive information for all terminals
 */
export const useTerminalVerbose: (
  params?: FetchFunctionParams<TerminalVerboseInput>,
  options?: QueryHookOptions<TerminalVerbose[]>
) => UseQueryResult<TerminalVerbose[], Error> = createHook(
  wsfTerminalsApi,
  terminalVerboseGroup,
  terminalVerboseMeta
);
