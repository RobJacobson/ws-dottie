import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotCommercialVehicleRestrictionsApi = createApiDefinition(
  "wsdot-commercial-vehicle-restrictions",
  [
    {
      function: "getCommercialVehicleRestrictions",
      endpoint:
        "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson",
      inputSchema: input.getCommercialVehicleRestrictionsSchema,
      outputSchema: output.cVRestrictionDataListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint:
        "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: input.getCommercialVehicleRestrictionsWithIdSchema,
      outputSchema: output.cVRestrictionDataWithIdListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ]
);
