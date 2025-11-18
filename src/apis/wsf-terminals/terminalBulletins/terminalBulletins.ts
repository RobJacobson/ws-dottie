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
import { terminalBulletinsGroup } from "./shared/terminalBulletins.endpoints";
import {
  type TerminalBulletinsInput,
  terminalBulletinsInputSchema,
} from "./shared/terminalBulletins.input";
import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./shared/terminalBulletins.output";

/**
 * Metadata for the fetchTerminalBulletins endpoint
 */
export const terminalBulletinsMeta = {
  functionName: "fetchTerminalBulletins",
  endpoint: "/terminalBulletins",
  inputSchema: terminalBulletinsInputSchema,
  outputSchema: terminalBulletinSchema.array(),
  sampleParams: {},
  endpointDescription: "List bulletins and alerts for all terminals.",
} satisfies EndpointMeta<TerminalBulletinsInput, TerminalBulletin[]>;

/**
 * Fetch function for retrieving bulletins and alerts for all terminals
 */
export const fetchTerminalBulletins: (
  params?: FetchFunctionParams<TerminalBulletinsInput>
) => Promise<TerminalBulletin[]> = createFetchFunction(
  apis.wsfTerminals,
  terminalBulletinsGroup,
  terminalBulletinsMeta
);

/**
 * React Query hook for retrieving bulletins and alerts for all terminals
 */
export const useTerminalBulletins: (
  params?: FetchFunctionParams<TerminalBulletinsInput>,
  options?: QueryHookOptions<TerminalBulletin[]>
) => UseQueryResult<TerminalBulletin[], Error> = createHook(
  apis.wsfTerminals,
  terminalBulletinsGroup,
  terminalBulletinsMeta
);
