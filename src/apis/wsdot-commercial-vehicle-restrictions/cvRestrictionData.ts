import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Commercial Vehicle Restriction data representing current restrictions for commercial vehicles including bridge and road restrictions with details such as maximum weights, heights, lengths, and widths. Coverage Area: Statewide.";

export const cvRestrictionDataResource = {
  name: "cv-restriction-data",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getCommercialVehicleRestrictions",
      endpoint: "/getCommercialVehicleRestrictionsAsJson",
      inputSchema: i.getCommercialVehicleRestrictionsSchema,
      outputSchema: z.array(o.cVRestrictionDataSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of commercial vehicle restriction data. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsInput,
      o.CVRestrictionData[]
    >,
  },
};
