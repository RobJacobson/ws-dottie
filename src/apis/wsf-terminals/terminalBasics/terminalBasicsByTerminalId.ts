import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal basics by terminal ID
 */
const terminalBasicsByTerminalIdFactory = createFetchAndHook<
  TerminalBasicsByIdInput,
  TerminalBasic
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBasicsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBasics.endpoints").terminalBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalBasicsByTerminalId,
  hook: useTerminalBasicsByTerminalId,
} = terminalBasicsByTerminalIdFactory;
