import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Commercial Vehicle Restriction data with unique identifiers representing current restrictions for commercial vehicles including bridge and road restrictions with details such as maximum weights, heights, lengths, and widths. Each record includes a UniqueID field for tracking purposes. Coverage Area: Statewide.";

export const cvRestrictionDataWithIdResource = {
  name: "cv-restriction-data-with-id",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: i.getCommercialVehicleRestrictionsWithIdSchema,
      outputSchema: z.array(o.cVRestrictionDataWithIdSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of commercial vehicle restriction data with unique identifiers. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsWithIdInput,
      o.CVRestrictionDataWithId[]
    >,
  },
};
