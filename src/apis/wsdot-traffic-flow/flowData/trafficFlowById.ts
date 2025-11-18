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
export const fetchTrafficFlowById: (
  params?: FetchFunctionParams<TrafficFlowByIdInput>
) => Promise<FlowData> = createFetchFunction(
  apis.wsdotTrafficFlow,
  flowDataGroup,
  trafficFlowByIdMeta
);

/**
 * React Query hook for retrieving current traffic flow condition for a specific station by ID
 */
export const useTrafficFlowById: (
  params?: FetchFunctionParams<TrafficFlowByIdInput>,
  options?: QueryHookOptions<FlowData>
) => UseQueryResult<FlowData, Error> = createHook(
  apis.wsdotTrafficFlow,
  flowDataGroup,
  trafficFlowByIdMeta
);
