import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TerminalsAndMatesInput,
  terminalsAndMatesInputSchema,
} from "./shared/terminals.input";
import {
  type TerminalMate,
  terminalMateSchema,
} from "./shared/terminals.output";

/**
 * Metadata for the fetchTerminalsAndMates endpoint
 */
export const terminalsAndMatesMeta = {
  functionName: "fetchTerminalsAndMates",
  endpoint: "/terminalsandmates/{TripDate}",
  inputSchema: terminalsAndMatesInputSchema,
  outputSchema: terminalMateSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List all valid terminal pairs for a trip date.",
  toolDescription: {
    purpose:
      "List all valid departing-arriving terminal combinations available for ferry service on a specific trip date.",
    useWhen: [
      "discovering all possible travel routes",
      "building comprehensive route planning interfaces",
      "validating terminal pair availability",
    ],
    avoidWhen: [
      "you need terminals for a specific departure point (prefer fetchTerminalMatesSchedule)",
      "you only need departing terminals (prefer fetchTerminals)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
    ],
    returns: "array — all valid terminal pairs for the trip date",
    outputHighlights: [
      "Departing terminal: DepartingTerminalID, DepartingDescription",
      "Arriving terminal: ArrivingTerminalID, ArrivingDescription",
    ],
  },
} satisfies EndpointMeta<TerminalsAndMatesInput, TerminalMate[]>;

/**
 * Factory result for terminals and mates
 */
const terminalsAndMatesFactory = createFetchAndHook<
  TerminalsAndMatesInput,
  TerminalMate[]
>({
  api: wsfScheduleApiMeta,
  endpoint: terminalsAndMatesMeta,
  getEndpointGroup: () =>
    require("./shared/terminals.endpoints").scheduleTerminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all valid terminal pairs for a trip date
 */
export const { fetch: fetchTerminalsAndMates, hook: useTerminalsAndMates } =
  terminalsAndMatesFactory;
