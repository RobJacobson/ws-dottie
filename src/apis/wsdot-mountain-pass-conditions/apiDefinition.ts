import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { passConditionsGroup } from "./passConditions/passConditions.endpoints";

export const wsdotMountainPassConditionsApi = {
  name: "wsdot-mountain-pass-conditions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
  endpointGroups: [passConditionsGroup],
} satisfies ApiDefinition;
