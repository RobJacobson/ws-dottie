import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./cvRestrictionData.input";
import * as o from "./cvRestrictionData.output";

export const cvRestrictionDataGroup: EndpointGroup = {
  name: "cv-restriction-data",
  documentation: {
    resourceDescription:
      "Each CVRestrictionData item represents current commercial vehicle restrictions for Washington State highways, including weight limits, height clearances, axle restrictions, and location details. These items provide essential regulatory information for bridge and road restrictions needed for commercial vehicle routing and permit processing.",
    businessContext:
      "Use to check vehicle restrictions and plan commercial routes by providing weight limits, height clearances, and axle restrictions for Washington State highways. Determine route feasibility and permit requirements for trucking companies and logistics providers.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCommercialVehicleRestrictions: {
      function: "getCommercialVehicleRestrictions",
      endpoint: "/getCommercialVehicleRestrictionsAsJson",
      inputSchema: i.getCommercialVehicleRestrictionsSchema,
      outputSchema: z.array(o.cVRestrictionDataSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of CVRestrictionData objects containing restriction information for all Washington State highways.",
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsInput,
      o.CVRestrictionData[]
    >,
  },
};
