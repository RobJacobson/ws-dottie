import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
import { terminalComboGroup } from "./shared/terminalCombo.endpoints";
import {
  type TerminalComboInput,
  terminalComboInputSchema,
} from "./shared/terminalCombo.input";
import {
  type TerminalComboFares,
  terminalComboFaresSchema,
} from "./shared/terminalCombo.output";

/**
 * Metadata for the fetchTerminalComboFares endpoint
 */
export const terminalComboFaresMeta = {
  functionName: "fetchTerminalComboFares",
  endpoint:
    "/terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: terminalComboInputSchema,
  outputSchema: terminalComboFaresSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription:
    "Get fare collection description for a specific terminal combination and trip date.",
} satisfies EndpointMeta<TerminalComboInput, TerminalComboFares>;

/**
 * Fetch function for retrieving fare collection description for a specific terminal combination and trip date
 */
export const fetchTerminalComboFares: FetchFactory<
  TerminalComboInput,
  TerminalComboFares
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: terminalComboFaresMeta,
});

/**
 * React Query hook for retrieving fare collection description for a specific terminal combination and trip date
 */
export const useTerminalComboFares: HookFactory<
  TerminalComboInput,
  TerminalComboFares
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: terminalComboFaresMeta.functionName,
  fetchFn: fetchTerminalComboFares,
  cacheStrategy: terminalComboGroup.cacheStrategy,
});
