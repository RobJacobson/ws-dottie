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
import { flowDataGroup } from "./shared/flowData.endpoints";
import {
  type TrafficFlowsInput,
  trafficFlowsInputSchema,
} from "./shared/flowData.input";
import { type FlowData, flowDataSchema } from "./shared/flowData.output";

/**
 * Metadata for the fetchTrafficFlows endpoint
 */
export const trafficFlowsMeta = {
  functionName: "fetchTrafficFlows",
  endpoint: "/getTrafficFlowsAsJson",
  inputSchema: trafficFlowsInputSchema,
  outputSchema: flowDataSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current traffic flow conditions for all stations statewide.",
} satisfies EndpointMeta<TrafficFlowsInput, FlowData[]>;

/**
 * Fetch function for retrieving current traffic flow conditions for all stations statewide
 */
export const fetchTrafficFlows: (
  params?: FetchFunctionParams<TrafficFlowsInput>
) => Promise<FlowData[]> = createFetchFunction(
  apis.wsdotTrafficFlow,
  flowDataGroup,
  trafficFlowsMeta
);

/**
 * React Query hook for retrieving current traffic flow conditions for all stations statewide
 */
export const useTrafficFlows: (
  params?: FetchFunctionParams<TrafficFlowsInput>,
  options?: QueryHookOptions<FlowData[]>
) => UseQueryResult<FlowData[], Error> = createHook(
  apis.wsdotTrafficFlow,
  flowDataGroup,
  trafficFlowsMeta
);
