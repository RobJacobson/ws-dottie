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
import { terminalBasicsGroup } from "./shared/terminalBasics.endpoints";
import {
  type TerminalBasicsInput,
  terminalBasicsInputSchema,
} from "./shared/terminalBasics.input";
import {
  type TerminalBasic,
  terminalBasicSchema,
} from "./shared/terminalBasics.output";

/**
 * Metadata for the fetchTerminalBasics endpoint
 */
export const terminalBasicsMeta = {
  functionName: "fetchTerminalBasics",
  endpoint: "/terminalBasics",
  inputSchema: terminalBasicsInputSchema,
  outputSchema: terminalBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all terminals.",
} satisfies EndpointMeta<TerminalBasicsInput, TerminalBasic[]>;

/**
 * Fetch function for retrieving basic information for all terminals
 */
export const fetchTerminalBasics: (
  params?: FetchFunctionParams<TerminalBasicsInput>
) => Promise<TerminalBasic[]> = createFetchFunction(
  wsfTerminalsApi,
  terminalBasicsGroup,
  terminalBasicsMeta
);

/**
 * React Query hook for retrieving basic information for all terminals
 */
export const useTerminalBasics: (
  params?: FetchFunctionParams<TerminalBasicsInput>,
  options?: QueryHookOptions<TerminalBasic[]>
) => UseQueryResult<TerminalBasic[], Error> = createHook(
  wsfTerminalsApi,
  terminalBasicsGroup,
  terminalBasicsMeta
);
