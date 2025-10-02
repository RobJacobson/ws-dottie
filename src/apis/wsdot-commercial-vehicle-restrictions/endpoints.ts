import { createApiDefinition } from "../utils";
import {
  getCommercialVehicleRestrictionsInputSchema,
  getCommercialVehicleRestrictionsWithIdInputSchema,
} from "./original/inputSchemas.original";
import {
  cVRestrictionDataListSchema,
  cVRestrictionDataWithIdListSchema,
} from "./original/outputSchemas.original";

export const wsdotCommercialVehicleRestrictionsApi = createApiDefinition(
  "wsdot-commercial-vehicle-restrictions",
  [
    {
      function: "getCommercialVehicleRestrictions",
      endpoint:
        "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson",
      inputSchema: getCommercialVehicleRestrictionsInputSchema,
      outputSchema: cVRestrictionDataListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint:
        "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: getCommercialVehicleRestrictionsWithIdInputSchema,
      outputSchema: cVRestrictionDataWithIdListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ]
);
