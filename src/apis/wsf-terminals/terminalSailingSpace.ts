import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Contains terminal condition data including the number of drive-up and reservation spaces available for select departures. This real-time information helps travelers plan their ferry trips and understand space availability. Data updates frequently during operational hours.";

export const terminalSailingSpaceResource = {
  name: "terminal-sailing-space",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTerminalSailingSpace",
      endpoint: "/terminalSailingSpace",
      inputSchema: i.terminalSailingSpaceSchema,
      outputSchema: z.array(o.terminalSailingSpaceSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of TerminalSailingSpace data for all terminals. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceInput,
      o.TerminalSailingSpace[]
    >,
    byId: {
      function: "getTerminalSailingSpaceByTerminalId",
      endpoint: "/terminalSailingSpace/{TerminalID}",
      inputSchema: i.terminalSailingSpaceByIdSchema,
      outputSchema: o.terminalSailingSpaceSchema,
      sampleParams: { TerminalID: 7 },
      cacheStrategy: "STATIC",
      description: `Returns TerminalSailingSpace data for the terminal with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceByIdInput,
      o.TerminalSailingSpace
    >,
  },
};
