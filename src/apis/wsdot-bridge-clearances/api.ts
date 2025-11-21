import type { ApiDefinition } from "@/apis/types";
import { wsdotBridgeClearancesApiMeta } from "./apiMeta";
import { bridgeClearancesGroup } from "./bridgeClearances/shared/bridgeClearances.endpoints";

export const wsdotBridgeClearances: ApiDefinition = {
  api: wsdotBridgeClearancesApiMeta,
  endpointGroups: [bridgeClearancesGroup],
};
