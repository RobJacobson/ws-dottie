import { wsdotTrafficFlowApi } from "@/apis/wsdot-traffic-flow/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { flowDataGroup } from "./flowData.endpoints";
import type { TrafficFlowByIdInput, TrafficFlowsInput } from "./flowData.input";
import type { FlowData } from "./flowData.output";

const fetchFunctions = createFetchFunctions(wsdotTrafficFlowApi, flowDataGroup);

export const fetchTrafficFlows: (
  params?: FetchFunctionParams<TrafficFlowsInput>
) => Promise<FlowData[]> = fetchFunctions.fetchTrafficFlows;

export const fetchTrafficFlowById: (
  params?: FetchFunctionParams<TrafficFlowByIdInput>
) => Promise<FlowData> = fetchFunctions.fetchTrafficFlowById;
