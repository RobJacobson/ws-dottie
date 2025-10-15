import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./terminalSailingSpace.input";
import * as o from "./terminalSailingSpace.output";

export const terminalSailingSpaceResource = {
  name: "terminal-sailing-space",
  resourceDescription:
    "Contains terminal condition data including the number of drive-up and reservation spaces available for select departures. This real-time information helps travelers plan their ferry trips and understand space availability. Data updates frequently during operational hours.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalSailingSpace: {
      function: "getTerminalSailingSpace",
      endpoint: "/terminalSailingSpace",
      inputSchema: i.terminalSailingSpaceSchema,
      outputSchema: z.array(o.terminalSailingSpaceSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalSailingSpace data for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceInput,
      o.TerminalSailingSpace[]
    >,
    getTerminalSailingSpaceByTerminalId: {
      function: "getTerminalSailingSpaceByTerminalId",
      endpoint: "/terminalSailingSpace/{TerminalID}",
      inputSchema: i.terminalSailingSpaceByIdSchema,
      outputSchema: o.terminalSailingSpaceSchema,
      sampleParams: { TerminalID: 7 },
      endpointDescription:
        "Returns TerminalSailingSpace data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceByIdInput,
      o.TerminalSailingSpace
    >,
  },
};
