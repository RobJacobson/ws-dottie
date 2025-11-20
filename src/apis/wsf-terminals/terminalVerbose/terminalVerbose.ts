import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import { terminalVerboseGroup } from "./shared/terminalVerbose.endpoints";
import {
  type TerminalVerboseInput,
  terminalVerboseInputSchema,
} from "./shared/terminalVerbose.input";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "./shared/terminalVerbose.output";

/**
 * Metadata for the fetchTerminalVerbose endpoint
 */
export const terminalVerboseMeta = {
  functionName: "fetchTerminalVerbose",
  endpoint: "/terminalVerbose",
  inputSchema: terminalVerboseInputSchema,
  outputSchema: terminalVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List comprehensive information for all terminals.",
} satisfies EndpointMeta<TerminalVerboseInput, TerminalVerbose[]>;

/**
 * Fetch function for retrieving comprehensive information for all terminals
 */
export const fetchTerminalVerbose: FetchFactory<
  TerminalVerboseInput,
  TerminalVerbose[]
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalVerboseMeta,
});

/**
 * React Query hook for retrieving comprehensive information for all terminals
 */
export const useTerminalVerbose: HookFactory<
  TerminalVerboseInput,
  TerminalVerbose[]
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalVerboseMeta.functionName,
  fetchFn: fetchTerminalVerbose,
  cacheStrategy: terminalVerboseGroup.cacheStrategy,
});
