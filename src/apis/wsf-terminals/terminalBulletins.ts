import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Contains terminal information with associated bulletins and alerts. Each terminal may have zero or more bulletins assigned to it, providing important notices, updates, and announcements for terminal users. Data updates infrequently.";

export const terminalBulletinsResource = {
  name: "terminal-bulletins",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTerminalBulletins",
      endpoint: "/terminalBulletins",
      inputSchema: i.terminalBulletinsSchema,
      outputSchema: z.array(o.terminalBulletinSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of TerminalBulletin data for all terminals. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalBulletinsInput,
      o.TerminalBulletin[]
    >,
    byId: {
      function: "getTerminalBulletinsByTerminalId",
      endpoint: "/terminalBulletins/{TerminalID}",
      inputSchema: i.terminalBulletinsByIdSchema,
      outputSchema: o.terminalBulletinSchema,
      sampleParams: { TerminalID: 3 },
      cacheStrategy: "STATIC",
      description: `Returns TerminalBulletin data for the terminal with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalBulletinsByIdInput,
      o.TerminalBulletin
    >,
  },
};
