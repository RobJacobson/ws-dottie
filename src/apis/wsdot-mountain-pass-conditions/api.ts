import type { ApiDefinition } from "@/apis/types";
import { wsdotMountainPassConditionsApiMeta } from "./apiMeta";
import { passConditionsGroup } from "./passConditions/shared/passConditions.endpoints";

export const wsdotMountainPassConditions: ApiDefinition = {
  api: wsdotMountainPassConditionsApiMeta,
  endpointGroups: [passConditionsGroup],
};
