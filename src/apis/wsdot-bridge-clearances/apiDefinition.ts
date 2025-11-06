import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { bridgeClearancesGroup } from "./bridgeClearances/bridgeClearances.endpoints";

export const wsdotBridgeClearancesApi = {
  name: "wsdot-bridge-clearances",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  endpointGroups: [bridgeClearancesGroup],
} satisfies ApiDefinition;
