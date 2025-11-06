import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./terminalBulletins.input";
import * as o from "./terminalBulletins.output";

export const terminalBulletinsResource = {
  name: "terminal-bulletins",
  documentation: {
    resourceDescription:
      "Each TerminalBulletin item represents important notices and alerts associated with Washington State Ferry terminals. These items include service updates, travel advisories, and critical announcements for terminal users.",
    businessContext:
      "Use to inform travelers of terminal conditions by providing current alerts and service notices for ferry terminal planning.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalBulletins: {
      function: "getTerminalBulletins",
      endpoint: "/terminalBulletins",
      inputSchema: i.terminalBulletinsInputSchema,
      outputSchema: z.array(o.terminalBulletinSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalBulletin objects for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalBulletinsInput,
      o.TerminalBulletin[]
    >,
    getTerminalBulletinsByTerminalId: {
      function: "getTerminalBulletinsByTerminalId",
      endpoint: "/terminalBulletins/{TerminalID}",
      inputSchema: i.terminalBulletinsByIdInputSchema,
      outputSchema: o.terminalBulletinSchema,
      sampleParams: { TerminalID: 3 },
      endpointDescription:
        "Returns TerminalBulletin data for the terminal with the specified terminal.",
    } satisfies EndpointDefinition<
      i.TerminalBulletinsByIdInput,
      o.TerminalBulletin
    >,
  },
} satisfies EndpointGroup;
