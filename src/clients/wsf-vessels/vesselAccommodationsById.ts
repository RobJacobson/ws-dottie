import { z } from "zod";
import { vesselAccommodationsSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

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
export const getVesselAccommodationsByIdMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselAccommodationsById",
  endpoint: "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}",
  inputSchema: vesselAccommodationsByIdInput,
  outputSchema: vesselAccommodationsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdInput
>;
