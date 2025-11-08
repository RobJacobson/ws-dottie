import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotTrafficFlowApi } from "../apiDefinition";
import { flowDataGroup } from "./flowData.endpoints";
import type { TrafficFlowByIdInput, TrafficFlowsInput } from "./flowData.input";
import type { FlowData } from "./flowData.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTrafficFlowApi,
  flowDataGroup
);

export const fetchTrafficFlows: (
  params?: FetchFunctionParams<TrafficFlowsInput>
) => Promise<FlowData[]> = fetchFunctions.fetchTrafficFlows;

export const fetchTrafficFlowById: (
  params?: FetchFunctionParams<TrafficFlowByIdInput>
) => Promise<FlowData> = fetchFunctions.fetchTrafficFlowById;
