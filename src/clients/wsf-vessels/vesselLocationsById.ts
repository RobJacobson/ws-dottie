import { z } from "zod";
import { vesselLocationsSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getVesselLocationsByVesselId */
const vesselLocationsByVesselIdInput = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselLocationsByVesselId */
export const getVesselLocationsByVesselIdMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselLocationsByVesselId",
  endpoint: "/ferries/api/vessels/rest/vessellocations/{vesselId}",
  inputSchema: vesselLocationsByVesselIdInput,
  outputSchema: vesselLocationsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "REALTIME_UPDATES",
});

// Type exports (ONLY input types, NO output types)
export type VesselLocationsByVesselIdInput = z.infer<
  typeof vesselLocationsByVesselIdInput
>;
