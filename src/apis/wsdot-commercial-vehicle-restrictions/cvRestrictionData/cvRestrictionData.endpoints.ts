import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
import { commercialVehicleRestrictionsInputSchema } from "./cvRestrictionData.input";
import { cvRestrictionSchema } from "./cvRestrictionData.output";

export const cvRestrictionDataGroup = defineEndpointGroup({
  name: "cv-restriction-data",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each CVRestrictionData item represents current commercial vehicle restrictions for Washington State highways, including weight limits, height clearances, axle restrictions, and location details. These items provide essential regulatory information for bridge and road restrictions needed for commercial vehicle routing and permit processing.",
    businessContext:
      "Use to check vehicle restrictions and plan commercial routes by providing weight limits, height clearances, and axle restrictions for Washington State highways. Determine route feasibility and permit requirements for trucking companies and logistics providers.",
  },
});

export const fetchCommercialVehicleRestrictions = defineEndpoint({
  apiName: wsdotCommercialVehicleRestrictionsApi.name,
  baseUrl: wsdotCommercialVehicleRestrictionsApi.baseUrl,
  group: cvRestrictionDataGroup,
  functionName: "fetchCommercialVehicleRestrictions",
  endpoint: "/getCommercialVehicleRestrictionsAsJson",
  inputSchema: commercialVehicleRestrictionsInputSchema,
  outputSchema: cvRestrictionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns an array of CVRestrictionData objects containing restriction information for all Washington State highways.",
});

