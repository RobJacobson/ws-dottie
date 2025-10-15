import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./cvRestrictionData.input";
import * as o from "./cvRestrictionData.output";

export const cvRestrictionDataResource = {
  name: "cv-restriction-data",
  resourceDescription:
    "Commercial Vehicle Restriction data representing current restrictions for commercial vehicles including bridge and road restrictions with details such as maximum weights, heights, lengths, and widths. Coverage Area: Statewide.",
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
