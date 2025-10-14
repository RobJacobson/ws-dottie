import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Terminal mates represent terminals that can be used interchangeably or as alternatives for ferry departures and arrivals, providing flexibility in route planning.";

export const scheduleTerminalMatesResource = {
  name: "schedule-terminal-mates",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byTripDateAndTerminal: {
      function: "getTerminalMates",
      endpoint: "/terminalmates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      cacheStrategy: "STATIC",
      description: `Returns terminal mates for the specified trip date and terminal ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.ScheduleTerminalMatesInput, o.Terminal[]>,
  },
};
