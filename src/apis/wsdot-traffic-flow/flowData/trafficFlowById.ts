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
  toolDescription: {
    purpose: "Get current traffic flow condition for a specific station by ID.",
    useWhen: [
      "monitoring specific traffic station",
      "getting detailed flow data for one location",
      "focused traffic analysis",
    ],
    avoidWhen: [
      "you need data for multiple stations (prefer fetchTrafficFlows)",
    ],
    inputsHighlights:
      "FlowDataID (numeric station identifier from fetchTrafficFlows FlowDataID field)",
    returns: "object — traffic flow data for one specific station",
    outputHighlights: [
      "Station identity: FlowDataID, StationName (route-direction-milepost code)",
      "Traffic condition: FlowReadingValue (1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo)",
      "Location details: FlowStationLocation with precise coordinates and road information",
      "Administrative: Region (WSDOT maintenance region)",
      "Freshness: Time (UTC timestamp, updated every 90 seconds)",
    ],
    chaining: [
      "fetchTrafficFlows → extract FlowDataID → call fetchTrafficFlowById with { FlowDataID: ... }",
    ],
  },
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
