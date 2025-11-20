import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
export const fetchTerminalBulletinsByTerminalId: FetchFactory<
  TerminalBulletinsByIdInput,
  TerminalBulletin
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBulletinsByTerminalIdMeta,
});

/**
 * React Query hook for retrieving bulletins and alerts for a specific terminal by ID
 */
export const useTerminalBulletinsByTerminalId: HookFactory<
  TerminalBulletinsByIdInput,
  TerminalBulletin
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalBulletinsByTerminalIdMeta.functionName,
  fetchFn: fetchTerminalBulletinsByTerminalId,
  cacheStrategy: terminalBulletinsGroup.cacheStrategy,
});
