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
    summary:
      "Arriving terminals that can be reached from a given departing terminal.",
    description:
      "Terminal mates represent valid destination terminals for a specific origin terminal and trip date. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Find valid destination terminals for trip planning interfaces.",
      "Build terminal selection workflows for route queries.",
      "Determine available terminal pairs for schedule lookups.",
    ],
    updateFrequency: "daily",
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
    "List valid arriving terminals for a departing terminal and trip date.",
});
