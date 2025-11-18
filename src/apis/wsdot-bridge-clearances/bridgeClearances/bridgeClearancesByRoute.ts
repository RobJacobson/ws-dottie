import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
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
export const fetchBridgeClearancesByRoute: (
  params?: FetchFunctionParams<BridgeClearancesByRouteInput>
) => Promise<BridgeClearance[]> = createFetchFunction(
  apis.wsdotBridgeClearances,
  bridgeClearancesGroup,
  bridgeClearancesByRouteMeta
);

/**
 * React Query hook for retrieving vertical clearance data for bridges on a specific state route
 */
export const useBridgeClearancesByRoute: (
  params?: FetchFunctionParams<BridgeClearancesByRouteInput>,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error> = createHook(
  apis.wsdotBridgeClearances,
  bridgeClearancesGroup,
  bridgeClearancesByRouteMeta
);
