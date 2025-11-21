import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTrafficFlowApiMeta } from "../apiMeta";
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
 * Factory result for traffic flows
 */
const trafficFlowsFactory = createFetchAndHook<TrafficFlowsInput, FlowData[]>({
  api: wsdotTrafficFlowApiMeta,
  endpoint: trafficFlowsMeta,
  getEndpointGroup: () => require("./shared/flowData.endpoints").flowDataGroup,
});

/**
 * Fetch function and React Query hook for retrieving current traffic flow conditions for all stations statewide
 */
export const { fetch: fetchTrafficFlows, hook: useTrafficFlows } =
  trafficFlowsFactory;
