import {
  type TerminalMatesInput,
  terminalMatesInputSchema,
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
 * Metadata for the fetchTerminalMatesFares endpoint
 */
export const terminalMatesFaresMeta = {
  functionName: "fetchTerminalMatesFares",
  endpoint: "/terminalMates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  endpointDescription:
    "List arriving terminals for a given departing terminal and trip date.",
} satisfies EndpointMeta<TerminalMatesInput, TerminalList>;

/**
 * Fetch function for retrieving arriving terminals for a given departing terminal and trip date
 */
export const fetchTerminalMatesFares: FetchFactory<
  TerminalMatesInput,
  TerminalList
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: terminalMatesFaresMeta,
});

/**
 * React Query hook for retrieving arriving terminals for a given departing terminal and trip date
 */
export const useTerminalMatesFares: HookFactory<
  TerminalMatesInput,
  TerminalList
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: terminalMatesFaresMeta.functionName,
  fetchFn: fetchTerminalMatesFares,
  cacheStrategy: terminalsGroup.cacheStrategy,
});
