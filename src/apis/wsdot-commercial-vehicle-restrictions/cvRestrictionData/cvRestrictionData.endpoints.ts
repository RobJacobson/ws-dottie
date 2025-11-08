import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type CommercialVehicleRestrictionsInput,
  commercialVehicleRestrictionsInputSchema,
} from "./cvRestrictionData.input";
import {
  type CVRestriction,
  cvRestrictionSchema,
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
    fetchCommercialVehicleRestrictions: {
      endpoint: "/getCommercialVehicleRestrictionsAsJson",
      inputSchema: commercialVehicleRestrictionsInputSchema,
      outputSchema: z.array(cvRestrictionSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of CVRestrictionData objects containing restriction information for all Washington State highways.",
    } satisfies EndpointDefinition<
      CommercialVehicleRestrictionsInput,
      CVRestriction[]
    >,
  },
} satisfies EndpointGroup;
