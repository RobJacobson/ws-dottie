import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each TerminalBasic item represents essential terminal details including terminal identification (name and ID), operational status (amenities like elevators, waiting rooms, food service, restrooms), and basic facility information. Data updates infrequently.";

export const terminalBasicsResource = {
  name: "terminal-basics",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTerminalBasics",
      endpoint: "/terminalBasics",
      inputSchema: i.terminalBasicsSchema,
      outputSchema: z.array(o.terminalBasicSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of TerminalBasic data for all terminals. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TerminalBasicsInput, o.TerminalBasic[]>,
    byId: {
      function: "getTerminalBasicsByTerminalId",
      endpoint: "/terminalBasics/{TerminalID}",
      inputSchema: i.terminalBasicsByIdSchema,
      outputSchema: o.terminalBasicSchema,
      sampleParams: { TerminalID: 1 },
      cacheStrategy: "STATIC",
      description: `Returns TerminalBasic data for the terminal with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TerminalBasicsByIdInput, o.TerminalBasic>,
  },
};
