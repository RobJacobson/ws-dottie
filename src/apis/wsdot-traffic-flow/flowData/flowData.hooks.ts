import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTrafficFlowApi } from "@/apis/wsdot-traffic-flow/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { flowDataGroup } from "./flowData.endpoints";
import * as fetchFunctions from "./flowData.fetch";
import type { TrafficFlowByIdInput, TrafficFlowsInput } from "./flowData.input";
import type { FlowData } from "./flowData.output";

const hooks = createHooks(wsdotTrafficFlowApi, flowDataGroup, fetchFunctions);

export const useTrafficFlows: (
  params?: FetchFunctionParams<TrafficFlowsInput>,
  options?: QueryHookOptions<FlowData[]>
) => UseQueryResult<FlowData[], Error> = hooks.useTrafficFlows;

export const useTrafficFlowById: (
  params?: FetchFunctionParams<TrafficFlowByIdInput>,
  options?: QueryHookOptions<FlowData>
) => UseQueryResult<FlowData, Error> = hooks.useTrafficFlowById;
