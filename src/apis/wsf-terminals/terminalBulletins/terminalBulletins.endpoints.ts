import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  terminalBulletinsByIdInputSchema,
  terminalBulletinsInputSchema,
} from "./terminalBulletins.input";
import { terminalBulletinSchema } from "./terminalBulletins.output";

export const terminalBulletinsGroup: EndpointGroup = {
  name: "terminal-bulletins",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Service alerts and notifications for ferry terminals.",
    description:
      "Important notices and alerts associated with Washington State Ferry terminals including service updates, travel advisories, and critical announcements. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal alerts and service notices in rider apps.",
      "Show travel advisories and critical announcements.",
      "Monitor terminal-specific and system-wide notifications.",
    ],
  },
};

export const fetchTerminalBulletins = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalBulletinsGroup,
  functionName: "fetchTerminalBulletins",
  endpoint: "/terminalBulletins",
  inputSchema: terminalBulletinsInputSchema,
  outputSchema: terminalBulletinSchema.array(),
  sampleParams: {},
  endpointDescription: "List bulletins and alerts for all terminals.",
});

export const fetchTerminalBulletinsByTerminalId = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalBulletinsGroup,
  functionName: "fetchTerminalBulletinsByTerminalId",
  endpoint: "/terminalBulletins/{TerminalID}",
  inputSchema: terminalBulletinsByIdInputSchema,
  outputSchema: terminalBulletinSchema,
  sampleParams: { TerminalID: 3 },
  endpointDescription:
    "Get bulletins and alerts for a specific terminal by ID.",
});
