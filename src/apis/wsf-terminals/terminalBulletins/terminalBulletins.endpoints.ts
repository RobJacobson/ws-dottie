import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
} from "./terminalBulletins.input";
import {
  terminalBulletinsByIdInputSchema,
  terminalBulletinsInputSchema,
} from "./terminalBulletins.input";
import type { TerminalBulletin } from "./terminalBulletins.output";
import { terminalBulletinSchema } from "./terminalBulletins.output";

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
      inputSchema: terminalBulletinsInputSchema,
      outputSchema: z.array(terminalBulletinSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalBulletin objects for all terminals.",
    } satisfies EndpointDefinition<TerminalBulletinsInput, TerminalBulletin[]>,
    getTerminalBulletinsByTerminalId: {
      function: "getTerminalBulletinsByTerminalId",
      endpoint: "/terminalBulletins/{TerminalID}",
      inputSchema: terminalBulletinsByIdInputSchema,
      outputSchema: terminalBulletinSchema,
      sampleParams: { TerminalID: 3 },
      endpointDescription:
        "Returns TerminalBulletin data for the terminal with the specified terminal.",
    } satisfies EndpointDefinition<
      TerminalBulletinsByIdInput,
      TerminalBulletin
    >,
  },
} satisfies EndpointGroup;
