import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { bridgeClearancesGroup } from "./bridgeClearances/bridgeClearances.endpoints";

export const wsdotBridgeClearancesApi = {
  api: apis.wsdotBridgeClearances,
  endpointGroups: [bridgeClearancesGroup],
} satisfies ApiDefinition;
