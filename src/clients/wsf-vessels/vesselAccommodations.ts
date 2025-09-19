import { z } from "zod";

import type { VesselAccommodations } from "@/schemas/wsf-vessels/vesselAccommodations.zod";
import { vesselAccommodationsSchema } from "@/schemas/wsf-vessels/vesselAccommodations.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselAccommodations */
const vesselAccommodationsInput = z.object({});

/** Endpoint metadata for getVesselAccommodations */
export const getVesselAccommodationsMeta: EndpointDefinition<
  VesselAccommodationsInput,
  VesselAccommodations[]
> = {
  id: "wsf-vessels/vesselAccommodations",
  endpoint: "/ferries/api/vessels/rest/vesselaccommodations",
  inputSchema: vesselAccommodationsInput,
  outputSchema: z.array(vesselAccommodationsSchema),
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsInput
>;
