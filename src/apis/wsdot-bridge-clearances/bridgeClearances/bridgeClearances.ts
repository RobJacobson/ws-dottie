import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotBridgeClearancesApiMeta } from "../apiMeta";
import {
  type BridgeClearancesInput,
  bridgeClearancesInputSchema,
} from "./shared/bridgeClearances.input";
import {
  type BridgeClearance,
  bridgeClearanceSchema,
} from "./shared/bridgeClearances.output";

/**
 * Metadata for the fetchBridgeClearances endpoint
 */
export const bridgeClearancesMeta = {
  functionName: "fetchBridgeClearances",
  endpoint: "/getClearancesAsJson",
  inputSchema: bridgeClearancesInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List vertical clearance data for all Washington State bridges.",
} satisfies EndpointMeta<BridgeClearancesInput, BridgeClearance[]>;

/**
 * Factory result for bridge clearances
 */
const bridgeClearancesFactory = createFetchAndHook<
  BridgeClearancesInput,
  BridgeClearance[]
>({
  api: wsdotBridgeClearancesApiMeta,
  endpoint: bridgeClearancesMeta,
  getEndpointGroup: () =>
    require("./shared/bridgeClearances.endpoints").bridgeClearancesGroup,
});

/**
 * Fetch function and React Query hook for retrieving vertical clearance data for all Washington State bridges
 */
export const { fetch: fetchBridgeClearances, hook: useBridgeClearances } =
  bridgeClearancesFactory;
