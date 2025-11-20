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
  type TerminalBasicsByIdInput,
  terminalBasicsByIdInputSchema,
} from "./shared/terminalBasics.input";
import {
  type TerminalBasic,
  terminalBasicSchema,
} from "./shared/terminalBasics.output";

/**
 * Metadata for the fetchTerminalBasicsByTerminalId endpoint
 */
export const terminalBasicsByTerminalIdMeta = {
  functionName: "fetchTerminalBasicsByTerminalId",
  endpoint: "/terminalBasics/{TerminalID}",
  inputSchema: terminalBasicsByIdInputSchema,
  outputSchema: terminalBasicSchema,
  sampleParams: { TerminalID: 1 },
  endpointDescription: "Get basic information for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalBasicsByIdInput, TerminalBasic>;

/**
 * Fetch function for retrieving basic information for a specific terminal by ID
 */
export const fetchTerminalBasicsByTerminalId: FetchFactory<
  TerminalBasicsByIdInput,
  TerminalBasic
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBasicsByTerminalIdMeta,
});

/**
 * React Query hook for retrieving basic information for a specific terminal by ID
 */
export const useTerminalBasicsByTerminalId: HookFactory<
  TerminalBasicsByIdInput,
  TerminalBasic
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalBasicsByTerminalIdMeta.functionName,
  fetchFn: fetchTerminalBasicsByTerminalId,
  cacheStrategy: terminalBasicsGroup.cacheStrategy,
});
