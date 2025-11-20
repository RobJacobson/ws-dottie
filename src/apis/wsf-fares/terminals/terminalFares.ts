import {
  type TerminalsInput,
  terminalsInputSchema,
} from "@/apis/shared/terminals.input";
import {
  type TerminalList,
  terminalListSchema,
} from "@/apis/shared/terminals.output";
import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import { terminalsGroup } from "./shared/terminals.endpoints";

/**
 * Metadata for the fetchTerminalFares endpoint
 */
export const terminalFaresMeta = {
  functionName: "fetchTerminalFares",
  endpoint: "/terminals/{TripDate}",
  inputSchema: terminalsInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List valid departing terminals for a trip date.",
} satisfies EndpointMeta<TerminalsInput, TerminalList>;

/**
 * Fetch function for retrieving valid departing terminals for a trip date
 */
export const fetchTerminalFares: FetchFactory<TerminalsInput, TerminalList> =
  createFetchFunction({
    api: wsfFaresApiMeta,
    endpoint: terminalFaresMeta,
  });

/**
 * React Query hook for retrieving valid departing terminals for a trip date
 */
export const useTerminalFares: HookFactory<TerminalsInput, TerminalList> =
  createHook({
    apiName: wsfFaresApiMeta.name,
    endpointName: terminalFaresMeta.functionName,
    fetchFn: fetchTerminalFares,
    cacheStrategy: terminalsGroup.cacheStrategy,
  });
