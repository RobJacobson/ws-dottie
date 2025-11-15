import { apis } from "@/apis/shared/apis";
import { terminalMatesInputSchema } from "@/apis/shared/terminals.input";
import { terminalListSchema } from "@/apis/shared/terminals.output";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";

export const scheduleTerminalMatesGroup: EndpointGroup = {
  name: "schedule-terminal-mates",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalMate item represents terminals that can be used interchangeably or as alternatives for ferry departures and arrivals, providing flexibility in route planning.",
    businessContext:
      "Use to find alternative terminal options by providing terminal ID and date information for flexible route selection.",
  },
};

export const fetchTerminalMatesSchedule = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTerminalMatesGroup,
  functionName: "fetchTerminalMatesSchedule",
  endpoint: "/terminalmates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  endpointDescription:
    "Returns multiple of Terminal for specified trip date and terminal ID.",
});
