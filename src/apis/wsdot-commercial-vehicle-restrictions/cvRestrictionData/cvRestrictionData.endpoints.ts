import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { commercialVehicleRestrictionsInputSchema } from "./cvRestrictionData.input";
import { cvRestrictionSchema } from "./cvRestrictionData.output";

export const cvRestrictionDataGroup: EndpointGroup = {
  name: "cv-restriction-data",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Commercial vehicle restrictions for Washington State highways.",
    description:
      "Weight limits, height clearances, axle restrictions, and location details for bridge and road restrictions statewide.",
    useCases: [
      "Check vehicle restrictions for commercial route planning.",
      "Determine route feasibility and permit requirements.",
      "Identify weight and height limitations for trucking operations.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchCommercialVehicleRestrictions = createEndpoint({
  api: apis.wsdotCommercialVehicleRestrictions,
  group: cvRestrictionDataGroup,
  functionName: "fetchCommercialVehicleRestrictions",
  endpoint: "/getCommercialVehicleRestrictionsAsJson",
  inputSchema: commercialVehicleRestrictionsInputSchema,
  outputSchema: cvRestrictionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List commercial vehicle restrictions for all Washington State highways.",
});
