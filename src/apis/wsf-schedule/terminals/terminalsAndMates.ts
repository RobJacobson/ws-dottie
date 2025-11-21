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
