import { terminalMatesInputSchema } from "@/apis/shared/terminals.input";
import { terminalListSchema } from "@/apis/shared/terminals.output";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApi } from "../apiDefinition";

export const scheduleTerminalMatesGroup = defineEndpointGroup({
  name: "schedule-terminal-mates",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalMate item represents terminals that can be used interchangeably or as alternatives for ferry departures and arrivals, providing flexibility in route planning.",
    businessContext:
      "Use to find alternative terminal options by providing terminal ID and date information for flexible route selection.",
  },
});

export const fetchTerminalMatesSchedule = defineEndpoint({
  apiName: wsfScheduleApi.name,
  baseUrl: wsfScheduleApi.baseUrl,
  group: scheduleTerminalMatesGroup,
  functionName: "fetchTerminalMatesSchedule",
  endpoint: "/terminalmates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  endpointDescription:
    "Returns multiple of Terminal for specified trip date and terminal ID.",
});

