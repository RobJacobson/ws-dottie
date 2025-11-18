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
import { terminalSailingSpaceGroup } from "./shared/terminalSailingSpace.endpoints";
import {
  type TerminalSailingSpaceInput,
  terminalSailingSpaceInputSchema,
} from "./shared/terminalSailingSpace.input";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./shared/terminalSailingSpace.output";

/**
 * Metadata for the fetchTerminalSailingSpace endpoint
 */
export const terminalSailingSpaceMeta = {
  functionName: "fetchTerminalSailingSpace",
  endpoint: "/terminalSailingSpace",
  inputSchema: terminalSailingSpaceInputSchema,
  outputSchema: terminalSailingSpaceSchema.array(),
  sampleParams: {},
  endpointDescription: "List sailing space availability for all terminals.",
} satisfies EndpointMeta<TerminalSailingSpaceInput, TerminalSailingSpace[]>;

/**
 * Fetch function for retrieving sailing space availability for all terminals
 */
export const fetchTerminalSailingSpace: (
  params?: FetchFunctionParams<TerminalSailingSpaceInput>
) => Promise<TerminalSailingSpace[]> = createFetchFunction(
  apis.wsfTerminals,
  terminalSailingSpaceGroup,
  terminalSailingSpaceMeta
);

/**
 * React Query hook for retrieving sailing space availability for all terminals
 */
export const useTerminalSailingSpace: (
  params?: FetchFunctionParams<TerminalSailingSpaceInput>,
  options?: QueryHookOptions<TerminalSailingSpace[]>
) => UseQueryResult<TerminalSailingSpace[], Error> = createHook(
  apis.wsfTerminals,
  terminalSailingSpaceGroup,
  terminalSailingSpaceMeta
);
