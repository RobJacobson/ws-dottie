import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Contains highly detailed information about terminals including basic details, bulletins, location data, sailing space information, transportation options, wait times, and comprehensive facility information. This endpoint should be used when you need comprehensive terminal data and don't mind receiving a larger payload. Data updates infrequently.";

export const terminalVerboseResource = {
  name: "terminal-verbose",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTerminalVerbose",
      endpoint: "/terminalVerbose",
      inputSchema: i.terminalVerboseSchema,
      outputSchema: z.array(o.terminalVerboseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of TerminalVerbose data for all terminals. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TerminalVerboseInput, o.TerminalVerbose[]>,
    byId: {
      function: "getTerminalVerboseByTerminalId",
      endpoint: "/terminalVerbose/{TerminalID}",
      inputSchema: i.terminalVerboseByIdSchema,
      outputSchema: o.terminalVerboseSchema,
      sampleParams: { TerminalID: 4 },
      cacheStrategy: "STATIC",
      description: `Returns TerminalVerbose data for the terminal with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalVerboseByIdInput,
      o.TerminalVerbose
    >,
  },
};
