import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import { terminalMatesInputSchema } from "@/apis/shared/terminals.input";
import type { TerminalList } from "@/apis/shared/terminals.output";
import { terminalListSchema } from "@/apis/shared/terminals.output";
import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";

/**
 * Metadata for the fetchTerminalMatesSchedule endpoint
 */
export const terminalMatesScheduleMeta = {
  functionName: "fetchTerminalMatesSchedule",
  endpoint: "/terminalmates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  endpointDescription:
    "List valid arriving terminals for a departing terminal and trip date.",
  toolDescription: {
    purpose:
      "List all valid arriving terminals that can be reached from a specific departing terminal on a trip date.",
    useWhen: [
      "discovering travel destinations from a starting terminal",
      "building terminal selection interfaces",
      "validating terminal-to-terminal routes",
    ],
    avoidWhen: [
      "you need all terminals in the system (prefer fetchTerminals)",
      "you don't know the departing TerminalID (prefer fetchTerminals first)",
    ],
    inputsHighlights:
      "TripDate (YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range); TerminalID (from fetchTerminals → TerminalID)",
    returns: "array — valid arriving terminals for the departing terminal",
    outputHighlights: ["Terminal info: TerminalID, Description (display name)"],
    chaining: [
      "fetchTerminals → extract TerminalID → call fetchTerminalMatesSchedule with { TerminalID: ..., TripDate: ... }",
    ],
  },
} satisfies EndpointMeta<TerminalMatesInput, TerminalList>;

/**
 * Factory result for terminal mates schedule
 */
const terminalMatesScheduleFactory = createFetchAndHook<
  TerminalMatesInput,
  TerminalList
>({
  api: wsfScheduleApiMeta,
  endpoint: terminalMatesScheduleMeta,
  getEndpointGroup: () =>
    require("./shared/terminalMates.endpoints").scheduleTerminalMatesGroup,
});

/**
 * Fetch function and React Query hook for retrieving valid arriving terminals for a departing terminal and trip date
 */
export const {
  fetch: fetchTerminalMatesSchedule,
  hook: useTerminalMatesSchedule,
} = terminalMatesScheduleFactory;
