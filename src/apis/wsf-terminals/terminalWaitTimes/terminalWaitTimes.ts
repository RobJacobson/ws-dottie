import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal wait times
 */
const terminalWaitTimesFactory = createFetchAndHook<
  TerminalWaitTimesInput,
  TerminalWaitTime[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalWaitTimesMeta,
  getEndpointGroup: () =>
    require("./shared/terminalWaitTimes.endpoints").terminalWaitTimesGroup,
});

/**
 * Fetch function and React Query hook for retrieving wait time information for all terminals
 */
export const { fetch: fetchTerminalWaitTimes, hook: useTerminalWaitTimes } =
  terminalWaitTimesFactory;
