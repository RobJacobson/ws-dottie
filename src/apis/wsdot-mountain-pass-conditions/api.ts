import type { ApiDefinition } from "@/apis/types";
import { passConditionsGroup } from "./passConditions/shared/passConditions.endpoints";

export const wsdotMountainPassConditionsApi: ApiDefinition = {
  api: {
    name: "wsdot-mountain-pass-conditions",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
  },
  endpointGroups: [passConditionsGroup],
};
