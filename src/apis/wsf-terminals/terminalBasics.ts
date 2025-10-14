import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const terminalBasicsResource = {
  name: "terminal-basics",
  resourceDescription:
    "Each TerminalBasic item represents essential terminal details including terminal identification (name and ID), operational status (amenities like elevators, waiting rooms, food service, restrooms), and basic facility information. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalBasics: {
      function: "getTerminalBasics",
      endpoint: "/terminalBasics",
      inputSchema: i.terminalBasicsSchema,
      outputSchema: z.array(o.terminalBasicSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalBasic data for all terminals.",
    } satisfies EndpointDefinition<i.TerminalBasicsInput, o.TerminalBasic[]>,
    getTerminalBasicsByTerminalId: {
      function: "getTerminalBasicsByTerminalId",
      endpoint: "/terminalBasics/{TerminalID}",
      inputSchema: i.terminalBasicsByIdSchema,
      outputSchema: o.terminalBasicSchema,
      sampleParams: { TerminalID: 1 },
      endpointDescription:
        "Returns TerminalBasic data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<i.TerminalBasicsByIdInput, o.TerminalBasic>,
  },
};
