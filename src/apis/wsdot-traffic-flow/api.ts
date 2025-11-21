import type { ApiDefinition } from "@/apis/types";
import { wsdotTrafficFlowApiMeta } from "./apiMeta";
import { flowDataGroup } from "./flowData/shared/flowData.endpoints";

export const wsdotTrafficFlowApi: ApiDefinition = {
  api: wsdotTrafficFlowApiMeta,
  endpointGroups: [flowDataGroup],
};
