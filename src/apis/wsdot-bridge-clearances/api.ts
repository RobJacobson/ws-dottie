import type { ApiDefinition } from "@/apis/types";
import { wsdotBridgeClearancesApiMeta } from "./apiMeta";
import { bridgeClearancesGroup } from "./bridgeClearances/shared/bridgeClearances.endpoints";

export const wsdotBridgeClearancesApi: ApiDefinition = {
  api: wsdotBridgeClearancesApiMeta,
  endpointGroups: [bridgeClearancesGroup],
};
