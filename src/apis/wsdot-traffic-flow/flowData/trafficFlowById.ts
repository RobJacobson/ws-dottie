import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTrafficFlowApiMeta } from "../apiMeta";
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
 * Factory result for traffic flow by ID
 */
const trafficFlowByIdFactory = createFetchAndHook<
  TrafficFlowByIdInput,
  FlowData
>({
  api: wsdotTrafficFlowApiMeta,
  endpoint: trafficFlowByIdMeta,
  getEndpointGroup: () => require("./shared/flowData.endpoints").flowDataGroup,
});

/**
 * Fetch function and React Query hook for retrieving current traffic flow condition for a specific station by ID
 */
export const { fetch: fetchTrafficFlowById, hook: useTrafficFlowById } =
  trafficFlowByIdFactory;
