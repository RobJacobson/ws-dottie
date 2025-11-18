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
import { terminalBulletinsGroup } from "./shared/terminalBulletins.endpoints";
import {
  type TerminalBulletinsByIdInput,
  terminalBulletinsByIdInputSchema,
} from "./shared/terminalBulletins.input";
import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./shared/terminalBulletins.output";

/**
 * Metadata for the fetchTerminalBulletinsByTerminalId endpoint
 */
export const terminalBulletinsByTerminalIdMeta = {
  functionName: "fetchTerminalBulletinsByTerminalId",
  endpoint: "/terminalBulletins/{TerminalID}",
  inputSchema: terminalBulletinsByIdInputSchema,
  outputSchema: terminalBulletinSchema,
  sampleParams: { TerminalID: 3 },
  endpointDescription:
    "Get bulletins and alerts for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalBulletinsByIdInput, TerminalBulletin>;

/**
 * Fetch function for retrieving bulletins and alerts for a specific terminal by ID
 */
export const fetchTerminalBulletinsByTerminalId: (
  params?: FetchFunctionParams<TerminalBulletinsByIdInput>
) => Promise<TerminalBulletin> = createFetchFunction(
  wsfTerminalsApi.api,
  terminalBulletinsGroup,
  terminalBulletinsByTerminalIdMeta
);

/**
 * React Query hook for retrieving bulletins and alerts for a specific terminal by ID
 */
export const useTerminalBulletinsByTerminalId: (
  params?: FetchFunctionParams<TerminalBulletinsByIdInput>,
  options?: QueryHookOptions<TerminalBulletin>
) => UseQueryResult<TerminalBulletin, Error> = createHook(
  wsfTerminalsApi.api,
  terminalBulletinsGroup,
  terminalBulletinsByTerminalIdMeta
);

