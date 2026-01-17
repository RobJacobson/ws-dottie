import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TerminalsAndMatesByRouteInput,
  terminalsAndMatesByRouteInputSchema,
} from "./shared/terminals.input";
import {
  type TerminalMate,
  terminalMateSchema,
} from "./shared/terminals.output";

/**
 * Metadata for the fetchTerminalsAndMatesByRoute endpoint
 */
export const terminalsAndMatesByRouteMeta = {
  functionName: "fetchTerminalsAndMatesByRoute",
  endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
  inputSchema: terminalsAndMatesByRouteInputSchema,
  outputSchema: terminalMateSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
  endpointDescription:
    "List valid terminal pairs for a specific route and trip date.",
  toolDescription: {
    purpose:
      "List all valid departing-arriving terminal combinations available on a specific route for a trip date.",
    useWhen: [
      "getting terminal options for a specific route",
      "planning travel along a particular ferry route",
      "validating route-specific terminal availability",
    ],
    avoidWhen: [
      "you need terminals for all routes (prefer fetchTerminalsAndMates)",
      "you don't know the RouteID (prefer fetchRoutesByTripDate first)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
      "RouteID: from fetchRoutesByTripDate → RouteID",
    ],
    returns: "array — valid terminal pairs for the specified route",
    outputHighlights: [
      "Departing terminal: DepartingTerminalID, DepartingDescription",
      "Arriving terminal: ArrivingTerminalID, ArrivingDescription",
    ],
    chaining: [
      "fetchRoutesByTripDate → extract RouteID → call fetchTerminalsAndMatesByRoute with { RouteID: ..., TripDate: ... }",
    ],
  },
} satisfies EndpointMeta<TerminalsAndMatesByRouteInput, TerminalMate[]>;

/**
 * Factory result for terminals and mates by route
 */
const terminalsAndMatesByRouteFactory = createFetchAndHook<
  TerminalsAndMatesByRouteInput,
  TerminalMate[]
>({
  api: wsfScheduleApiMeta,
  endpoint: terminalsAndMatesByRouteMeta,
  getEndpointGroup: () =>
    require("./shared/terminals.endpoints").scheduleTerminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving valid terminal pairs for a specific route and trip date
 */
export const {
  fetch: fetchTerminalsAndMatesByRoute,
  hook: useTerminalsAndMatesByRoute,
} = terminalsAndMatesByRouteFactory;
