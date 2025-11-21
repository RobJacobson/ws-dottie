import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal basics
 */
const terminalBasicsFactory = createFetchAndHook<
  TerminalBasicsInput,
  TerminalBasic[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalBasicsMeta,
  getEndpointGroup: () =>
    require("./shared/terminalBasics.endpoints").terminalBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for all terminals
 */
export const { fetch: fetchTerminalBasics, hook: useTerminalBasics } =
  terminalBasicsFactory;
