import { z } from "@/shared/zod-openapi-init";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./cvRestrictionDataWithId.input";
import * as o from "./cvRestrictionDataWithId.output";

export const cvRestrictionDataWithIdGroup: EndpointGroup = {
  name: "cv-restriction-data-with-id",
  documentation: {
    resourceDescription:
      "Each CVRestrictionDataWithId item represents current commercial vehicle restrictions for Washington State highways with unique tracking identifiers. These include weight limits, height clearances, axle restrictions, and restriction details for both bridge and road restrictions across the statewide coverage area.",
    businessContext:
      "Use to check vehicle restrictions and track specific limitations by providing weight limits, height clearances, and unique identifiers for Washington State highways. Monitor restriction changes and manage permit requirements for trucking companies and logistics providers.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCommercialVehicleRestrictionsWithId: {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: i.getCommercialVehicleRestrictionsWithIdSchema,
      outputSchema: z.array(o.cVRestrictionDataWithIdSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of CVRestrictionDataWithId objects containing restriction information with unique identifiers for all Washington State highways.",
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsWithIdInput,
      o.CVRestrictionDataWithId[]
    >,
  },
};
