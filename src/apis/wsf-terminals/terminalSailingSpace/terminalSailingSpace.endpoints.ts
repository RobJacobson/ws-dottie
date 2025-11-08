import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type TerminalSailingSpaceByTerminalIdInput,
  type TerminalSailingSpaceInput,
  terminalSailingSpaceByTerminalIdInputSchema,
  terminalSailingSpaceInputSchema,
} from "./terminalSailingSpace.input";
import {
  type TerminalSailingSpace,
  terminalSailingSpaceSchema,
} from "./terminalSailingSpace.output";

export const terminalSailingSpaceResource = {
  name: "terminal-sailing-space",
  documentation: {
    resourceDescription:
      "Contains terminal condition data including the number of drive-up and reservation spaces available for select departures. This real-time information helps travelers plan their ferry trips and understand space availability.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchTerminalSailingSpace: {
      endpoint: "/terminalSailingSpace",
      inputSchema: terminalSailingSpaceInputSchema,
      outputSchema: z.array(terminalSailingSpaceSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalSailingSpace objects for all terminals.",
    } satisfies EndpointDefinition<
      TerminalSailingSpaceInput,
      TerminalSailingSpace[]
    >,
    fetchTerminalSailingSpaceByTerminalId: {
      endpoint: "/terminalSailingSpace/{TerminalID}",
      inputSchema: terminalSailingSpaceByTerminalIdInputSchema,
      outputSchema: terminalSailingSpaceSchema,
      sampleParams: { TerminalID: 7 },
      endpointDescription:
        "Returns TerminalSailingSpace data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      TerminalSailingSpaceByTerminalIdInput,
      TerminalSailingSpace
    >,
  },
} satisfies EndpointGroup;
