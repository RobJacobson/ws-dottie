import { z } from "zod";

import {
  type VesselLocation,
  vesselLocationSchema,
} from "@/schemas/wsf-vessels/vesselLocations.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselLocationsByVesselId */
const vesselLocationsByVesselIdInput = z.object({
  VesselID: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselLocationsByVesselId */
export const getVesselLocationsByVesselIdMeta: EndpointDefinition<
  VesselLocationsByVesselIdInput,
  VesselLocation
> = {
  api: "wsf-vessels",
  function: "vesselLocationsById",
  endpoint: "/ferries/api/vessels/rest/vessellocations/{VesselID}",
  inputSchema: vesselLocationsByVesselIdInput,
  outputSchema: vesselLocationSchema,
  sampleParams: { VesselID: 18 },
  cacheStrategy: "REALTIME",
} as const;

// Type exports
export type VesselLocationsByVesselIdInput = z.infer<
  typeof vesselLocationsByVesselIdInput
>;
