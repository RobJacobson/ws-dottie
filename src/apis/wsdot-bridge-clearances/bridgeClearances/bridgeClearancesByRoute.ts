import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotBridgeClearancesApiMeta } from "../apiMeta";
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
 * Factory result for bridge clearances by route
 */
const bridgeClearancesByRouteFactory = createFetchAndHook<
  BridgeClearancesByRouteInput,
  BridgeClearance[]
>({
  api: wsdotBridgeClearancesApiMeta,
  endpoint: bridgeClearancesByRouteMeta,
  getEndpointGroup: () =>
    require("./shared/bridgeClearances.endpoints").bridgeClearancesGroup,
});

/**
 * Fetch function and React Query hook for retrieving vertical clearance data for bridges on a specific state route
 */
export const {
  fetch: fetchBridgeClearancesByRoute,
  hook: useBridgeClearancesByRoute,
} = bridgeClearancesByRouteFactory;
