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
  type BridgeClearancesByRouteInput,
  bridgeClearancesByRouteInputSchema,
} from "./shared/bridgeClearances.input";
import {
  type BridgeClearance,
  bridgeClearanceSchema,
} from "./shared/bridgeClearances.output";

/**
 * Metadata for the fetchBridgeClearancesByRoute endpoint
 */
export const bridgeClearancesByRouteMeta = {
  functionName: "fetchBridgeClearancesByRoute",
  endpoint: "/getClearancesAsJson?Route={Route}",
  inputSchema: bridgeClearancesByRouteInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: { Route: "005" },
  endpointDescription:
    "Get vertical clearance data for bridges on a specific state route.",
} satisfies EndpointMeta<BridgeClearancesByRouteInput, BridgeClearance[]>;

/**
 * Fetch function for retrieving vertical clearance data for bridges on a specific state route
 */
export const fetchBridgeClearancesByRoute: FetchFactory<
  BridgeClearancesByRouteInput,
  BridgeClearance[]
> = createFetchFunction({
  api: wsdotBridgeClearancesApiMeta,
  endpoint: bridgeClearancesByRouteMeta,
});

/**
 * React Query hook for retrieving vertical clearance data for bridges on a specific state route
 */
export const useBridgeClearancesByRoute: HookFactory<
  BridgeClearancesByRouteInput,
  BridgeClearance[]
> = createHook({
  apiName: wsdotBridgeClearancesApiMeta.name,
  endpointName: bridgeClearancesByRouteMeta.functionName,
  fetchFn: fetchBridgeClearancesByRoute,
  cacheStrategy: bridgeClearancesGroup.cacheStrategy,
});
