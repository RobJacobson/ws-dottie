import type { ApiDefinition } from "@/shared/endpoints";
import { input, output } from "./schemas";

export const wsdotCommercialVehicleRestrictionsApi: ApiDefinition = {
  name: "wsdot-commercial-vehicle-restrictions",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  endpoints: [
    {
      function: "getCommercialVehicleRestrictions",
      endpoint: "/getCommercialVehicleRestrictionsAsJson",
      inputSchema: input.getCommercialVehicleRestrictionsSchema,
      outputSchema: output.cVRestrictionDataListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: input.getCommercialVehicleRestrictionsWithIdSchema,
      outputSchema: output.cVRestrictionDataWithIdListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ],
};
