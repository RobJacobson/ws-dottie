import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
export const fetchTerminalSailingSpaceByTerminalId: FetchFactory<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalSailingSpaceByTerminalIdMeta,
});

/**
 * React Query hook for retrieving sailing space availability for a specific terminal by ID
 */
export const useTerminalSailingSpaceByTerminalId: HookFactory<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalSailingSpaceByTerminalIdMeta.functionName,
  fetchFn: fetchTerminalSailingSpaceByTerminalId,
  cacheStrategy: terminalSailingSpaceGroup.cacheStrategy,
});
