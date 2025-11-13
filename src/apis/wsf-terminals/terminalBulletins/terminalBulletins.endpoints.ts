import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfTerminalsApi } from "../apiDefinition";
import {
  terminalBulletinsByIdInputSchema,
  terminalBulletinsInputSchema,
} from "./terminalBulletins.input";
import { terminalBulletinSchema } from "./terminalBulletins.output";

const group = defineEndpointGroup({
  api: wsfTerminalsApi,
  name: "terminal-bulletins",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalBulletin item represents important notices and alerts associated with Washington State Ferry terminals. These items include service updates, travel advisories, and critical announcements for terminal users.",
    businessContext:
      "Use to inform travelers of terminal conditions by providing current alerts and service notices for ferry terminal planning.",
  },
});

export const fetchTerminalBulletins = defineEndpoint({
  group,
  functionName: "fetchTerminalBulletins",
  definition: {
    endpoint: "/terminalBulletins",
    inputSchema: terminalBulletinsInputSchema,
    outputSchema: terminalBulletinSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple TerminalBulletin objects for all terminals.",
  },
});

export const fetchTerminalBulletinsByTerminalId = defineEndpoint({
  group,
  functionName: "fetchTerminalBulletinsByTerminalId",
  definition: {
    endpoint: "/terminalBulletins/{TerminalID}",
    inputSchema: terminalBulletinsByIdInputSchema,
    outputSchema: terminalBulletinSchema,
    sampleParams: { TerminalID: 3 },
    endpointDescription:
      "Returns TerminalBulletin data for the terminal with the specified terminal.",
  },
});

export const terminalBulletinsResource = group.descriptor;
