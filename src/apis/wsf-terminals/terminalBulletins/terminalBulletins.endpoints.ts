import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import {
  terminalBulletinsByIdInputSchema,
  terminalBulletinsInputSchema,
} from "./terminalBulletins.input";
import { terminalBulletinSchema } from "./terminalBulletins.output";

export const terminalBulletinsGroup: EndpointGroup = {
  name: "terminal-bulletins",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalBulletin item represents important notices and alerts associated with Washington State Ferry terminals. These items include service updates, travel advisories, and critical announcements for terminal users.",
    businessContext:
      "Use to inform travelers of terminal conditions by providing current alerts and service notices for ferry terminal planning.",
  },
};

export const fetchTerminalBulletins = defineEndpoint({
  api: apis.wsfTerminals,
  group: terminalBulletinsGroup,
  functionName: "fetchTerminalBulletins",
  endpoint: "/terminalBulletins",
  inputSchema: terminalBulletinsInputSchema,
  outputSchema: terminalBulletinSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple TerminalBulletin objects for all terminals.",
});

export const fetchTerminalBulletinsByTerminalId = defineEndpoint({
  api: apis.wsfTerminals,
  group: terminalBulletinsGroup,
  functionName: "fetchTerminalBulletinsByTerminalId",
  endpoint: "/terminalBulletins/{TerminalID}",
  inputSchema: terminalBulletinsByIdInputSchema,
  outputSchema: terminalBulletinSchema,
  sampleParams: { TerminalID: 3 },
  endpointDescription:
    "Returns TerminalBulletin data for terminal with the specified terminal.",
});
