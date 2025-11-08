import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotTrafficFlowApi } from "../apiDefinition";
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
