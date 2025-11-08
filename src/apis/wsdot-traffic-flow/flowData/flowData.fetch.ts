import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotTrafficFlowApi } from "../apiDefinition";
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
