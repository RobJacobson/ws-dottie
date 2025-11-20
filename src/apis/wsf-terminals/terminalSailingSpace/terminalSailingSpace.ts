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
  type TerminalSailingSpaceInput,
  terminalSailingSpaceInputSchema,
} from "./shared/terminalSailingSpace.input";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./shared/terminalSailingSpace.output";

/**
 * Metadata for the fetchTerminalSailingSpace endpoint
 */
export const terminalSailingSpaceMeta = {
  functionName: "fetchTerminalSailingSpace",
  endpoint: "/terminalSailingSpace",
  inputSchema: terminalSailingSpaceInputSchema,
  outputSchema: terminalSailingSpaceSchema.array(),
  sampleParams: {},
  endpointDescription: "List sailing space availability for all terminals.",
} satisfies EndpointMeta<TerminalSailingSpaceInput, TerminalSailingSpace[]>;

/**
 * Fetch function for retrieving sailing space availability for all terminals
 */
export const fetchTerminalSailingSpace: FetchFactory<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: terminalSailingSpaceMeta,
});

/**
 * React Query hook for retrieving sailing space availability for all terminals
 */
export const useTerminalSailingSpace: HookFactory<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: terminalSailingSpaceMeta.functionName,
  fetchFn: fetchTerminalSailingSpace,
  cacheStrategy: terminalSailingSpaceGroup.cacheStrategy,
});
