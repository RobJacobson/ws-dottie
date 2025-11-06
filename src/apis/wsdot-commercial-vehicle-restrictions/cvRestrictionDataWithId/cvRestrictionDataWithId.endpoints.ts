import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type CVRestrictionDataWithIdInput,
  cvRestrictionDataWithIdInputSchema,
} from "./cvRestrictionDataWithId.input";
import {
  type CVRestrictionDataWithId,
  cvRestrictionDataWithIdOutputSchema,
} from "./cvRestrictionDataWithId.output";

export const cvRestrictionDataWithIdGroup = {
  name: "cv-restriction-data-with-id",
  documentation: {
    resourceDescription:
      "Each CVRestrictionDataWithId item represents current commercial vehicle restrictions for Washington State highways with unique tracking identifiers. These include weight limits, height clearances, axle restrictions, and restriction details for both bridge and road restrictions across the statewide coverage area.",
    businessContext:
      "Use to check vehicle restrictions and track specific limitations by providing weight limits, height clearances, and unique identifiers for Washington State highways. Monitor restriction changes and manage permit requirements for trucking companies and logistics providers.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCommercialVehicleRestrictionsWithId: {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: cvRestrictionDataWithIdInputSchema,
      outputSchema: z.array(cvRestrictionDataWithIdOutputSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of CVRestrictionDataWithId objects containing restriction information with unique identifiers for all Washington State highways.",
    } satisfies EndpointDefinition<
      CVRestrictionDataWithIdInput,
      CVRestrictionDataWithId[]
    >,
  },
} satisfies EndpointGroup;
