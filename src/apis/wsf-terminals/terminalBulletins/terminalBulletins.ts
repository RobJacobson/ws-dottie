import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  type TerminalBulletinsInput,
  terminalBulletinsInputSchema,
} from "./shared/terminalBulletins.input";
import {
  type TerminalBulletin,
  terminalBulletinSchema,
} from "./shared/terminalBulletins.output";

/**
 * Metadata for the fetchTerminalBulletins endpoint
 */
export const terminalBulletinsMeta = {
  functionName: "fetchTerminalBulletins",
  endpoint: "/terminalBulletins",
  inputSchema: terminalBulletinsInputSchema,
  outputSchema: terminalBulletinSchema.array(),
  sampleParams: {},
  endpointDescription: "List bulletins and alerts for all terminals.",
} satisfies EndpointMeta<TerminalBulletinsInput, TerminalBulletin[]>;

/**
 * Factory result for terminal bulletins
 */
const terminalBulletinsFactory = createFetchAndHook<
  TerminalBulletinsInput,
  TerminalBulletin[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBulletinsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBulletins.endpoints").terminalBulletinsGroup,
});

/**
 * Fetch function and React Query hook for retrieving bulletins and alerts for all terminals
 */
export const { fetch: fetchTerminalBulletins, hook: useTerminalBulletins } =
  terminalBulletinsFactory;
