import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useTrafficFlows = hooks.useTrafficFlows as (
  params?: TrafficFlowsInput,
  options?: QueryHookOptions<FlowData[]>
) => UseQueryResult<FlowData[], Error>;

export const useTrafficFlowById = hooks.useTrafficFlowById as (
  params?: TrafficFlowByIdInput,
  options?: QueryHookOptions<FlowData>
) => UseQueryResult<FlowData, Error>;
