import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./cvRestrictionData.input";
import * as o from "./cvRestrictionData.output";

export const cvRestrictionDataGroup: EndpointGroup = {
  name: "cv-restriction-data",
  documentation: {
    resourceDescription:
      "Commercial Vehicle Restriction data representing current restrictions for commercial vehicles including bridge and road restrictions with details such as maximum weights, heights, lengths, and widths. Coverage Area: Statewide.",
    businessContext: "",
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
        "Returns a list of commercial vehicle restriction data.",
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsInput,
      o.CVRestrictionData[]
    >,
  },
};
