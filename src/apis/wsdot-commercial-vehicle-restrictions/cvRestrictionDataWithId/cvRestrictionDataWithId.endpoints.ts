import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { commercialVehicleRestrictionsWithIdInputSchema } from "./cvRestrictionDataWithId.input";
import { cvRestrictionWithIdSchema } from "./cvRestrictionDataWithId.output";

export const cvRestrictionDataWithIdGroup: EndpointGroup = {
  name: "cv-restriction-data-with-id",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Commercial vehicle restrictions with unique identifiers for Washington State highways.",
    description:
      "Weight limits, height clearances, axle restrictions, and location details with unique tracking IDs for bridge and road restrictions statewide.",
    useCases: [
      "Track specific restrictions using unique identifiers.",
      "Monitor restriction changes over time.",
      "Manage permit requirements with ID-based lookups.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchCommercialVehicleRestrictionsWithId = createEndpoint({
  api: apis.wsdotCommercialVehicleRestrictions,
  group: cvRestrictionDataWithIdGroup,
  functionName: "fetchCommercialVehicleRestrictionsWithId",
  endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
  inputSchema: commercialVehicleRestrictionsWithIdInputSchema,
  outputSchema: cvRestrictionWithIdSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List commercial vehicle restrictions with unique identifiers for all Washington State highways.",
});
