import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const terminalBulletinsResource = {
  name: "terminal-bulletins",
  resourceDescription:
    "Contains terminal information with associated bulletins and alerts. Each terminal may have zero or more bulletins assigned to it, providing important notices, updates, and announcements for terminal users. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalBulletins: {
      function: "getTerminalBulletins",
      endpoint: "/terminalBulletins",
      inputSchema: i.terminalBulletinsSchema,
      outputSchema: z.array(o.terminalBulletinSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalBulletin data for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalBulletinsInput,
      o.TerminalBulletin[]
    >,
    getTerminalBulletinsByTerminalId: {
      function: "getTerminalBulletinsByTerminalId",
      endpoint: "/terminalBulletins/{TerminalID}",
      inputSchema: i.terminalBulletinsByIdSchema,
      outputSchema: o.terminalBulletinSchema,
      sampleParams: { TerminalID: 3 },
      endpointDescription:
        "Returns TerminalBulletin data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      i.TerminalBulletinsByIdInput,
      o.TerminalBulletin
    >,
  },
};
