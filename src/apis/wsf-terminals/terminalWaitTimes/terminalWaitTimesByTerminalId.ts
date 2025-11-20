import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import { terminalWaitTimesGroup } from "./shared/terminalWaitTimes.endpoints";
import {
  type TerminalWaitTimesByIdInput,
  terminalWaitTimesByIdInputSchema,
} from "./shared/terminalWaitTimes.input";
import {
  type TerminalWaitTime,
  terminalWaitTimeSchema,
} from "./shared/terminalWaitTimes.output";

/**
 * Metadata for the fetchTerminalWaitTimesByTerminalId endpoint
 */
export const terminalWaitTimesByTerminalIdMeta = {
  functionName: "fetchTerminalWaitTimesByTerminalId",
  endpoint: "/terminalWaitTimes/{TerminalID}",
  inputSchema: terminalWaitTimesByIdInputSchema,
  outputSchema: terminalWaitTimeSchema,
  sampleParams: { TerminalID: 11 },
  endpointDescription:
    "Get wait time information for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalWaitTimesByIdInput, TerminalWaitTime>;

/**
 * Fetch function for retrieving wait time information for a specific terminal by ID
 */
export const fetchTerminalWaitTimesByTerminalId: FetchFactory<
  TerminalWaitTimesByIdInput,
  TerminalWaitTime
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalWaitTimesByTerminalIdMeta,
});

/**
 * React Query hook for retrieving wait time information for a specific terminal by ID
 */
export const useTerminalWaitTimesByTerminalId: HookFactory<
  TerminalWaitTimesByIdInput,
  TerminalWaitTime
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalWaitTimesByTerminalIdMeta.functionName,
  fetchFn: fetchTerminalWaitTimesByTerminalId,
  cacheStrategy: terminalWaitTimesGroup.cacheStrategy,
});
