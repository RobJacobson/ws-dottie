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
  toolDescription: {
    purpose: "List current traffic flow conditions for all stations statewide.",
    useWhen: [
      "comprehensive traffic analysis across all regions",
      "finding available traffic stations for mapping",
      "bulk traffic monitoring",
    ],
    avoidWhen: [
      "you only need one station's data (prefer fetchTrafficFlowById)",
      "payload size is a concern (returns thousands of stations)",
    ],
    inputs: [],
    returns: "array — one item per traffic flow station",
    outputHighlights: [
      "Station info: FlowDataID (unique identifier), StationName (route-direction-milepost code)",
      "Flow condition: FlowReadingValue (0=Unknown, 1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo, 5=NoData)",
      "Location: FlowStationLocation with coordinates, direction, milepost, road name",
      "Region: WSDOT region maintaining the station",
      "Timing: Time (UTC timestamp of last reading)",
    ],
    chaining: [
      "fetchTrafficFlows → extract FlowDataID → call fetchTrafficFlowById with { FlowDataID: ... }",
    ],
  },
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
