import {
  type TerminalMatesInput,
  terminalMatesInputSchema,
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
 * Factory result for terminal mates fares
 */
const terminalMatesFaresFactory = createFetchAndHook<
  TerminalMatesInput,
  TerminalList
>({
  api: wsfFaresApiMeta,
  endpoint: terminalMatesFaresMeta,
  getEndpointGroup: () =>
    require("./shared/terminals.endpoints").terminalsGroup,
});

/**
 * Fetch function and React Query hook for retrieving arriving terminals for a given departing terminal and trip date
 */
export const { fetch: fetchTerminalMatesFares, hook: useTerminalMatesFares } =
  terminalMatesFaresFactory;
