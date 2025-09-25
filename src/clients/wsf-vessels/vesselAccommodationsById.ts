import { z } from "zod";

import {
  type VesselAccommodations,
  vesselAccommodationsSchema,
} from "@/schemas/wsf-vessels/vesselAccommodations.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselAccommodationsById */
const vesselAccommodationsByIdInput = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselAccommodationsById */
export const getVesselAccommodationsByIdMeta: EndpointDefinition<
  VesselAccommodationsByIdInput,
  VesselAccommodations
> = {
  id: "wsf-vessels:vesselAccommodationsById",
  endpoint: "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}",
  inputSchema: vesselAccommodationsByIdInput,
  outputSchema: vesselAccommodationsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdInput
>;
