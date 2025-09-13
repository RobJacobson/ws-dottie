import { z } from "zod";
import { vesselAccommodationssSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getVesselAccommodations */
const vesselAccommodationsInput = z.object({});

/** Endpoint metadata for getVesselAccommodations */
export const getVesselAccommodationsMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselAccommodations",
  endpoint: "/ferries/api/vessels/rest/vesselaccommodations",
  inputSchema: vesselAccommodationsInput,
  outputSchema: vesselAccommodationssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsInput
>;
