import type { ApiDefinition } from "@/apis/types";
import { wsdotMountainPassConditionsApiMeta } from "./apiMeta";
import { passConditionsGroup } from "./passConditions/shared/passConditions.endpoints";

export const wsdotMountainPassConditionsApi: ApiDefinition = {
  api: wsdotMountainPassConditionsApiMeta,
  endpointGroups: [passConditionsGroup],
};
