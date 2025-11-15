import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { commercialVehicleRestrictionsWithIdInputSchema } from "./cvRestrictionDataWithId.input";
import { cvRestrictionWithIdSchema } from "./cvRestrictionDataWithId.output";

export const cvRestrictionDataWithIdGroup = defineEndpointGroup({
  name: "cv-restriction-data-with-id",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each CVRestrictionDataWithId item represents current commercial vehicle restrictions for Washington State highways with unique tracking identifiers. These include weight limits, height clearances, axle restrictions, and restriction details for both bridge and road restrictions across the statewide coverage area.",
    businessContext:
      "Use to check vehicle restrictions and track specific limitations by providing weight limits, height clearances, and unique identifiers for Washington State highways. Monitor restriction changes and manage permit requirements for trucking companies and logistics providers.",
  },
});

export const fetchCommercialVehicleRestrictionsWithId = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: cvRestrictionDataWithIdGroup,
  functionName: "fetchCommercialVehicleRestrictionsWithId",
  endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
  inputSchema: commercialVehicleRestrictionsWithIdInputSchema,
  outputSchema: cvRestrictionWithIdSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns an array of CVRestrictionDataWithId objects containing restriction information with unique identifiers for all Washington State highways.",
});
