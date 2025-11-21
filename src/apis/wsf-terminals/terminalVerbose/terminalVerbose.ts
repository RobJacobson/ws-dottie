import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal verbose
 */
const terminalVerboseFactory = createFetchAndHook<
  TerminalVerboseInput,
  TerminalVerbose[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalVerboseMeta,
  getEndpointGroup: () =>
    require("./shared/terminalVerbose.endpoints").terminalVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving comprehensive information for all terminals
 */
export const { fetch: fetchTerminalVerbose, hook: useTerminalVerbose } =
  terminalVerboseFactory;
