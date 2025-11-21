import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
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
 * Factory result for terminal sailing space
 */
const terminalSailingSpaceFactory = createFetchAndHook<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
>({
  api: wsfTerminalsApiMeta,
  endpoint: terminalSailingSpaceMeta,
  getEndpointGroup: () =>
    require("./shared/terminalSailingSpace.endpoints")
      .terminalSailingSpaceGroup,
});

/**
 * Fetch function and React Query hook for retrieving sailing space availability for all terminals
 */
export const {
  fetch: fetchTerminalSailingSpace,
  hook: useTerminalSailingSpace,
} = terminalSailingSpaceFactory;
