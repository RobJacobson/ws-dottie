import {
  type TerminalsInput,
  terminalsInputSchema,
} from "@/apis/shared/terminals.input";
import {
  type TerminalList,
  terminalListSchema,
} from "@/apis/shared/terminals.output";
import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApiMeta } from "../apiMeta";

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
 * Factory result for terminal fares
 */
const terminalFaresFactory = createFetchAndHook<TerminalsInput, TerminalList>({
  api: wsfFaresApiMeta,
  endpoint: terminalFaresMeta,
  getEndpointGroup: () =>
    require("./shared/terminals.endpoints").terminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving valid departing terminals for a trip date
 */
export const { fetch: fetchTerminalFares, hook: useTerminalFares } =
  terminalFaresFactory;
