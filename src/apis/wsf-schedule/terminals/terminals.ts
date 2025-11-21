import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TerminalsInput,
  terminalsInputSchema,
} from "./shared/terminals.input";
import { type Terminal, terminalSchema } from "./shared/terminals.output";

/**
 * Metadata for the fetchTerminals endpoint
 */
export const terminalsMeta = {
  functionName: "fetchTerminals",
  endpoint: "/terminals/{TripDate}",
  inputSchema: terminalsInputSchema,
  outputSchema: terminalSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List valid departing terminals for a trip date.",
} satisfies EndpointMeta<TerminalsInput, Terminal[]>;

/**
 * Factory result for terminals
 */
const terminalsFactory = createFetchAndHook<TerminalsInput, Terminal[]>({
  api: wsfScheduleApiMeta,
  endpoint: terminalsMeta,
  getEndpointGroup: () =>
    require("./shared/terminals.endpoints").scheduleTerminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving valid departing terminals for a trip date
 */
export const { fetch: fetchTerminals, hook: useTerminals } = terminalsFactory;
