import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import { terminalBasicsGroup } from "./shared/terminalBasics.endpoints";
import {
  type TerminalBasicsInput,
  terminalBasicsInputSchema,
} from "./shared/terminalBasics.input";
import {
  type TerminalBasic,
  terminalBasicSchema,
} from "./shared/terminalBasics.output";

/**
 * Metadata for the fetchTerminalBasics endpoint
 */
export const terminalBasicsMeta = {
  functionName: "fetchTerminalBasics",
  endpoint: "/terminalBasics",
  inputSchema: terminalBasicsInputSchema,
  outputSchema: terminalBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all terminals.",
} satisfies EndpointMeta<TerminalBasicsInput, TerminalBasic[]>;

/**
 * Fetch function for retrieving basic information for all terminals
 */
export const fetchTerminalBasics: FetchFactory<
  TerminalBasicsInput,
  TerminalBasic[]
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBasicsMeta,
});

/**
 * React Query hook for retrieving basic information for all terminals
 */
export const useTerminalBasics: HookFactory<
  TerminalBasicsInput,
  TerminalBasic[]
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalBasicsMeta.functionName,
  fetchFn: fetchTerminalBasics,
  cacheStrategy: terminalBasicsGroup.cacheStrategy,
});
