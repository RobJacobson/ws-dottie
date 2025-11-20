import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import { scheduleTerminalsGroup } from "./shared/terminals.endpoints";
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
 * Fetch function for retrieving valid departing terminals for a trip date
 */
export const fetchTerminals: FetchFactory<TerminalsInput, Terminal[]> =
  createFetchFunction({
    api: wsfScheduleApiMeta,
    endpoint: terminalsMeta,
  });

/**
 * React Query hook for retrieving valid departing terminals for a trip date
 */
export const useTerminals: HookFactory<TerminalsInput, Terminal[]> = createHook(
  {
    apiName: wsfScheduleApiMeta.name,
    endpointName: terminalsMeta.functionName,
    fetchFn: fetchTerminals,
    cacheStrategy: scheduleTerminalsGroup.cacheStrategy,
  }
);
