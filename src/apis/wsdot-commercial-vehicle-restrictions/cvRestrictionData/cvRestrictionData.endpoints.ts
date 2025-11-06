import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type CVRestrictionDataInput,
  cvRestrictionDataInputSchema,
} from "./cvRestrictionData.input";
import {
  type CVRestrictionData,
  cvRestrictionDataOutputSchema,
} from "./cvRestrictionData.output";

export const cvRestrictionDataGroup = {
  name: "cv-restriction-data",
  documentation: {
    resourceDescription:
      "Each CVRestrictionData item represents current commercial vehicle restrictions for Washington State highways, including weight limits, height clearances, axle restrictions, and location details. These items provide essential regulatory information for bridge and road restrictions needed for commercial vehicle routing and permit processing.",
    businessContext:
      "Use to check vehicle restrictions and plan commercial routes by providing weight limits, height clearances, and axle restrictions for Washington State highways. Determine route feasibility and permit requirements for trucking companies and logistics providers.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCommercialVehicleRestrictions: {
      function: "getCommercialVehicleRestrictions",
      endpoint: "/getCommercialVehicleRestrictionsAsJson",
      inputSchema: cvRestrictionDataInputSchema,
      outputSchema: z.array(cvRestrictionDataOutputSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of CVRestrictionData objects containing restriction information for all Washington State highways.",
    } satisfies EndpointDefinition<CVRestrictionDataInput, CVRestrictionData[]>,
  },
} satisfies EndpointGroup;
