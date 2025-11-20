import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotBridgeClearancesApiMeta } from "../apiMeta";
import { bridgeClearancesGroup } from "./shared/bridgeClearances.endpoints";
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
 * Fetch function for retrieving vertical clearance data for all Washington State bridges
 */
export const fetchBridgeClearances: FetchFactory<
  BridgeClearancesInput,
  BridgeClearance[]
> = createFetchFunction({
  api: wsdotBridgeClearancesApiMeta,
  endpoint: bridgeClearancesMeta,
});

/**
 * React Query hook for retrieving vertical clearance data for all Washington State bridges
 */
export const useBridgeClearances: HookFactory<
  BridgeClearancesInput,
  BridgeClearance[]
> = createHook({
  apiName: wsdotBridgeClearancesApiMeta.name,
  endpointName: bridgeClearancesMeta.functionName,
  fetchFn: fetchBridgeClearances,
  cacheStrategy: bridgeClearancesGroup.cacheStrategy,
});
