import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";
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
 * Factory result for terminal combo fares
 */
const terminalComboFaresFactory = createFetchAndHook<
  TerminalComboInput,
  TerminalComboFares
>({
  api: wsfFaresApiMeta,
  endpoint: terminalComboFaresMeta,
  getEndpointGroup: () =>
    require("./shared/terminalCombo.endpoints").terminalComboGroup,
});

/**
 * Fetch function and React Query hook for retrieving fare collection description for a specific terminal combination and trip date
 */
export const { fetch: fetchTerminalComboFares, hook: useTerminalComboFares } =
  terminalComboFaresFactory;
