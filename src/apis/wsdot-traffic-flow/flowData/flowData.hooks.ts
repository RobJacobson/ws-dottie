import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotTrafficFlowApi } from "../apiDefinition";
import { flowDataGroup } from "./flowData.endpoints";
import * as fetchFunctions from "./flowData.fetch";
import type { TrafficFlowByIdInput, TrafficFlowsInput } from "./flowData.input";
import type { FlowData } from "./flowData.output";

const hooks = createEndpointGroupHooks(
  wsdotTrafficFlowApi,
  flowDataGroup,
  fetchFunctions
);

export const useTrafficFlows: (
  params?: TrafficFlowsInput,
  options?: QueryHookOptions<FlowData[]>
) => UseQueryResult<FlowData[], Error> = hooks.useTrafficFlows;

export const useTrafficFlowById: (
  params?: TrafficFlowByIdInput,
  options?: QueryHookOptions<FlowData>
) => UseQueryResult<FlowData, Error> = hooks.useTrafficFlowById;
