import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotTrafficFlowApi } from "../apiDefinition";
import { flowDataGroup } from "./flowData.endpoints";
import type { TrafficFlowByIdInput, TrafficFlowsInput } from "./flowData.input";
import type { FlowData } from "./flowData.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotTrafficFlowApi,
  flowDataGroup
);

export const fetchTrafficFlows = fetchFunctions.fetchTrafficFlows as (
  params?: FetchFunctionParams<TrafficFlowsInput>
) => Promise<FlowData[]>;

export const fetchTrafficFlowById = fetchFunctions.fetchTrafficFlowById as (
  params?: FetchFunctionParams<TrafficFlowByIdInput>
) => Promise<FlowData>;
