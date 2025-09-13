import { z } from "zod";
import {
  vesselLocationsSchema,
  type VesselLocations,
} from "@/schemas/wsf-vessels/vesselLocations.zod";
import type { Endpoint } from "@/shared/endpoints";

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
export const getVesselLocationsByVesselIdMeta: Endpoint<
  VesselLocationsByVesselIdInput,
  VesselLocations
> = {
  api: "wsf-vessels",
  function: "getVesselLocationsByVesselId",
  endpoint: "/ferries/api/vessels/rest/vessellocations/{vesselId}",
  inputSchema: vesselLocationsByVesselIdInput,
  outputSchema: vesselLocationsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "REALTIME_UPDATES",
} as const;

// Type exports
export type VesselLocationsByVesselIdInput = z.infer<
  typeof vesselLocationsByVesselIdInput
>;
