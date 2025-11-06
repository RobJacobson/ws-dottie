import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./terminalSailingSpace.input";
import * as o from "./terminalSailingSpace.output";

export const terminalSailingSpaceResource = {
  name: "terminal-sailing-space",
  documentation: {
    resourceDescription:
      "Contains terminal condition data including the number of drive-up and reservation spaces available for select departures. This real-time information helps travelers plan their ferry trips and understand space availability.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalSailingSpace: {
      function: "getTerminalSailingSpace",
      endpoint: "/terminalSailingSpace",
      inputSchema: i.terminalSailingSpaceInputSchema,
      outputSchema: z.array(o.terminalSailingSpaceSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalSailingSpace objects for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceInput,
      o.TerminalSailingSpace[]
    >,
    getTerminalSailingSpaceByTerminalId: {
      function: "getTerminalSailingSpaceByTerminalId",
      endpoint: "/terminalSailingSpace/{TerminalID}",
      inputSchema: i.terminalSailingSpaceByTerminalIdInputSchema,
      outputSchema: o.terminalSailingSpaceSchema,
      sampleParams: { TerminalID: 7 },
      endpointDescription:
        "Returns TerminalSailingSpace data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceByTerminalIdInput,
      o.TerminalSailingSpace
    >,
  },
} satisfies EndpointGroup;
