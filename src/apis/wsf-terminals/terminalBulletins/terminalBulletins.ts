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
export const fetchTerminalBulletins: FetchFactory<
  TerminalBulletinsInput,
  TerminalBulletin[]
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBulletinsMeta,
});

/**
 * React Query hook for retrieving bulletins and alerts for all terminals
 */
export const useTerminalBulletins: HookFactory<
  TerminalBulletinsInput,
  TerminalBulletin[]
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalBulletinsMeta.functionName,
  fetchFn: fetchTerminalBulletins,
  cacheStrategy: terminalBulletinsGroup.cacheStrategy,
});
