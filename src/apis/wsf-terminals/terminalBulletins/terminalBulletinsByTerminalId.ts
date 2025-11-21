import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalBulletinsByIdInput,
  terminalBulletinsByIdInputSchema,
} from "./shared/terminalBulletins.input";
import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./shared/terminalBulletins.output";

/**
 * Metadata for the fetchTerminalBulletinsByTerminalId endpoint
 */
export const terminalBulletinsByTerminalIdMeta = {
  functionName: "fetchTerminalBulletinsByTerminalId",
  endpoint: "/terminalBulletins/{TerminalID}",
  inputSchema: terminalBulletinsByIdInputSchema,
  outputSchema: terminalBulletinSchema,
  sampleParams: { TerminalID: 3 },
  endpointDescription:
    "Get bulletins and alerts for a specific terminal by ID.",
} satisfies EndpointMeta<TerminalBulletinsByIdInput, TerminalBulletin>;

/**
 * Factory result for terminal bulletins by terminal ID
 */
const terminalBulletinsByTerminalIdFactory = createFetchAndHook<
  TerminalBulletinsByIdInput,
  TerminalBulletin
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBulletinsByTerminalIdMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBulletins.endpoints").terminalBulletinsGroup,
});

/**
 * Fetch function and React Query hook for retrieving bulletins and alerts for a specific terminal by ID
 */
export const {
  fetch: fetchTerminalBulletinsByTerminalId,
  hook: useTerminalBulletinsByTerminalId,
} = terminalBulletinsByTerminalIdFactory;
