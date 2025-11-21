import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal wait times by terminal ID
 */
const terminalWaitTimesByTerminalIdFactory = createFetchAndHook<
  TerminalWaitTimesByIdInput,
  TerminalWaitTime
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalWaitTimesByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalWaitTimes.endpoints").terminalWaitTimesGroup,
});

/**
 * Fetch function and React Query hook for retrieving wait time information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalWaitTimesByTerminalId,
  hook: useTerminalWaitTimesByTerminalId,
} = terminalWaitTimesByTerminalIdFactory;
