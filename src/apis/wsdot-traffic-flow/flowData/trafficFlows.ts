import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotTrafficFlowApiMeta } from "../apiMeta";
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
export const fetchTrafficFlows: FetchFactory<TrafficFlowsInput, FlowData[]> =
  createFetchFunction({
    api: wsdotTrafficFlowApiMeta,
    endpoint: trafficFlowsMeta,
  });

/**
 * React Query hook for retrieving current traffic flow conditions for all stations statewide
 */
export const useTrafficFlows: HookFactory<TrafficFlowsInput, FlowData[]> =
  createHook({
    apiName: wsdotTrafficFlowApiMeta.name,
    endpointName: trafficFlowsMeta.functionName,
    fetchFn: fetchTrafficFlows,
    cacheStrategy: flowDataGroup.cacheStrategy,
  });
