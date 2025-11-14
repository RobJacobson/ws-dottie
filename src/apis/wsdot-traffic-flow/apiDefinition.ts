import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { flowDataGroup } from "./flowData/flowData.endpoints";

export const wsdotTrafficFlowApi = {
  api: apis.wsdotTrafficFlow,
  endpointGroups: [flowDataGroup],
} satisfies ApiDefinition;
