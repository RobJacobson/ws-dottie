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
} from "@/shared/factories";
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
export const fetchBridgeClearances: (
  params?: FetchFunctionParams<BridgeClearancesInput>
) => Promise<BridgeClearance[]> = createFetchFunction(
  apis.wsdotBridgeClearances,
  bridgeClearancesGroup,
  bridgeClearancesMeta
);

/**
 * React Query hook for retrieving vertical clearance data for all Washington State bridges
 */
export const useBridgeClearances: (
  params?: FetchFunctionParams<BridgeClearancesInput>,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error> = createHook(
  apis.wsdotBridgeClearances,
  bridgeClearancesGroup,
  bridgeClearancesMeta
);
