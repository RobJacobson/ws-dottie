import type { ApiDefinition } from "@/apis/types";
import { input, output } from "./schemas";

export const wsdotMountainPassConditionsApi: ApiDefinition = {
  name: "wsdot-mountain-pass-conditions",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
  endpoints: [
    {
      function: "getMountainPassCondition",
      endpoint:
        "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
      inputSchema: input.getMountainPassConditionSchema,
      outputSchema: output.passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      cacheStrategy: "STATIC",
    },
    {
      function: "getMountainPassConditions",
      endpoint: "/getMountainPassConditionsAsJson",
      inputSchema: input.getMountainPassConditionsSchema,
      outputSchema: output.mountainPassConditionsListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ],
};
