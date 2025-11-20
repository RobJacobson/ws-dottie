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
  type TerminalWaitTimesInput,
  terminalWaitTimesInputSchema,
} from "./shared/terminalWaitTimes.input";
import {
  type TerminalWaitTime,
  terminalWaitTimeSchema,
} from "./shared/terminalWaitTimes.output";

/**
 * Metadata for the fetchTerminalWaitTimes endpoint
 */
export const terminalWaitTimesMeta = {
  functionName: "fetchTerminalWaitTimes",
  endpoint: "/terminalWaitTimes",
  inputSchema: terminalWaitTimesInputSchema,
  outputSchema: terminalWaitTimeSchema.array(),
  sampleParams: {},
  endpointDescription: "List wait time information for all terminals.",
} satisfies EndpointMeta<TerminalWaitTimesInput, TerminalWaitTime[]>;

/**
 * Fetch function for retrieving wait time information for all terminals
 */
export const fetchTerminalWaitTimes: FetchFactory<
  TerminalWaitTimesInput,
  TerminalWaitTime[]
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalWaitTimesMeta,
});

/**
 * React Query hook for retrieving wait time information for all terminals
 */
export const useTerminalWaitTimes: HookFactory<
  TerminalWaitTimesInput,
  TerminalWaitTime[]
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalWaitTimesMeta.functionName,
  fetchFn: fetchTerminalWaitTimes,
  cacheStrategy: terminalWaitTimesGroup.cacheStrategy,
});
