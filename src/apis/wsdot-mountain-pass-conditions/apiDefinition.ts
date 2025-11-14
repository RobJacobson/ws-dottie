import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { passConditionsGroup } from "./passConditions/passConditions.endpoints";

export const wsdotMountainPassConditionsApi = {
  api: apis.wsdotMountainPassConditions,
  endpointGroups: [passConditionsGroup],
} satisfies ApiDefinition;
