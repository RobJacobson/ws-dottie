import type { ApiDefinition } from "@/apis/types";
import { flowDataGroup } from "./flowData/shared/flowData.endpoints";

export const wsdotTrafficFlowApi: ApiDefinition = {
  api: {
    name: "wsdot-traffic-flow",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
  },
  endpointGroups: [flowDataGroup],
};
