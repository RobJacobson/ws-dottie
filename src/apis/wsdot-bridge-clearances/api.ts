import type { ApiDefinition } from "@/apis/types";
import { bridgeClearancesGroup } from "./bridgeClearances/shared/bridgeClearances.endpoints";

export const wsdotBridgeClearancesApi: ApiDefinition = {
  api: {
    name: "wsdot-bridge-clearances",
    baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  },
  endpointGroups: [bridgeClearancesGroup],
};
