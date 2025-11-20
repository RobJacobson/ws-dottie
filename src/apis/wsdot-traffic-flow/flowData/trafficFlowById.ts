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
  type TrafficFlowByIdInput,
  trafficFlowByIdInputSchema,
} from "./shared/flowData.input";
import { type FlowData, flowDataSchema } from "./shared/flowData.output";

/**
 * Metadata for the fetchTrafficFlowById endpoint
 */
export const trafficFlowByIdMeta = {
  functionName: "fetchTrafficFlowById",
  endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
  inputSchema: trafficFlowByIdInputSchema,
  outputSchema: flowDataSchema,
  sampleParams: { FlowDataID: 2482 },
  endpointDescription:
    "Get current traffic flow condition for a specific station by ID.",
} satisfies EndpointMeta<TrafficFlowByIdInput, FlowData>;

/**
 * Fetch function for retrieving current traffic flow condition for a specific station by ID
 */
export const fetchTrafficFlowById: FetchFactory<
  TrafficFlowByIdInput,
  FlowData
> = createFetchFunction({
  api: wsdotTrafficFlowApiMeta,
  endpoint: trafficFlowByIdMeta,
});

/**
 * React Query hook for retrieving current traffic flow condition for a specific station by ID
 */
export const useTrafficFlowById: HookFactory<TrafficFlowByIdInput, FlowData> =
  createHook({
    apiName: wsdotTrafficFlowApiMeta.name,
    endpointName: trafficFlowByIdMeta.functionName,
    fetchFn: fetchTrafficFlowById,
    cacheStrategy: flowDataGroup.cacheStrategy,
  });
