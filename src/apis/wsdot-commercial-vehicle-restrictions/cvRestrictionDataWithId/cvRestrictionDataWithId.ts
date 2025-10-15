import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./cvRestrictionDataWithId.input";
import * as o from "./cvRestrictionDataWithId.output";

export const cvRestrictionDataWithIdResource = {
  name: "cv-restriction-data-with-id",
  resourceDescription:
    "Commercial Vehicle Restriction data with unique identifiers representing current restrictions for commercial vehicles including bridge and road restrictions with details such as maximum weights, heights, lengths, and widths. Each record includes a UniqueID field for tracking purposes. Coverage Area: Statewide.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCommercialVehicleRestrictionsWithId: {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: i.getCommercialVehicleRestrictionsWithIdSchema,
      outputSchema: z.array(o.cVRestrictionDataWithIdSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of commercial vehicle restriction data with unique identifiers.",
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsWithIdInput,
      o.CVRestrictionDataWithId[]
    >,
  },
};
