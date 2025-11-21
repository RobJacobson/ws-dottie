import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalSailingSpaceByTerminalIdInput,
  terminalSailingSpaceByTerminalIdInputSchema,
} from "./shared/terminalSailingSpace.input";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./shared/terminalSailingSpace.output";

/**
 * Metadata for the fetchTerminalSailingSpaceByTerminalId endpoint
 */
export const terminalSailingSpaceByTerminalIdMeta = {
  functionName: "fetchTerminalSailingSpaceByTerminalId",
  endpoint: "/terminalSailingSpace/{TerminalID}",
  inputSchema: terminalSailingSpaceByTerminalIdInputSchema,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { TerminalID: 7 },
  endpointDescription:
    "Get sailing space availability for a specific terminal by ID.",
} satisfies EndpointMeta<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
>;

/**
 * Factory result for terminal sailing space by terminal ID
 */
const terminalSailingSpaceByTerminalIdFactory = createFetchAndHook<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalSailingSpaceByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalSailingSpace.endpoints")
      .terminalSailingSpaceGroup,
});

/**
 * Fetch function and React Query hook for retrieving sailing space availability for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalSailingSpaceByTerminalId,
  hook: useTerminalSailingSpaceByTerminalId,
} = terminalSailingSpaceByTerminalIdFactory;
