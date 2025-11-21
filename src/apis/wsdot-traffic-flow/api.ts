import type { ApiDefinition } from "@/apis/types";
import { wsdotTrafficFlowApiMeta } from "./apiMeta";
import { flowDataGroup } from "./flowData/shared/flowData.endpoints";

export const wsdotTrafficFlow: ApiDefinition = {
  api: wsdotTrafficFlowApiMeta,
  endpointGroups: [flowDataGroup],
};
