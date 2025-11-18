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
import { terminalSailingSpaceGroup } from "./shared/terminalSailingSpace.endpoints";
import {
  type TerminalSailingSpaceByTerminalIdInput,
  terminalSailingSpaceByTerminalIdInputSchema,
} from "./shared/terminalSailingSpace.input";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./shared/terminalSailingSpace.output";

/**
 * Metadata for the fetchTerminalSailingSpaceByTerminalId endpoint
 */
export const terminalSailingSpaceByTerminalIdMeta = {
  functionName: "fetchTerminalSailingSpaceByTerminalId",
  endpoint: "/terminalSailingSpace/{TerminalID}",
  inputSchema: terminalSailingSpaceByTerminalIdInputSchema,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { TerminalID: 7 },
  endpointDescription:
    "Get sailing space availability for a specific terminal by ID.",
} satisfies EndpointMeta<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
>;

/**
 * Fetch function for retrieving sailing space availability for a specific terminal by ID
 */
export const fetchTerminalSailingSpaceByTerminalId: (
  params?: FetchFunctionParams<TerminalSailingSpaceByTerminalIdInput>
) => Promise<TerminalSailingSpace> = createFetchFunction(
  wsfTerminalsApi,
  terminalSailingSpaceGroup,
  terminalSailingSpaceByTerminalIdMeta
);

/**
 * React Query hook for retrieving sailing space availability for a specific terminal by ID
 */
export const useTerminalSailingSpaceByTerminalId: (
  params?: FetchFunctionParams<TerminalSailingSpaceByTerminalIdInput>,
  options?: QueryHookOptions<TerminalSailingSpace>
) => UseQueryResult<TerminalSailingSpace, Error> = createHook(
  wsfTerminalsApi,
  terminalSailingSpaceGroup,
  terminalSailingSpaceByTerminalIdMeta
);
