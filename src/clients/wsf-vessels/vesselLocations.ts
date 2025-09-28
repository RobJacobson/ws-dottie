import { z } from "zod";

import {
  type VesselLocations,
  vesselLocationsSchema,
} from "@/schemas/wsf-vessels/vesselLocations.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselLocations */
const vesselLocationsInput = z.object({}).strict();

/** Endpoint metadata for getVesselLocations */
export const getVesselLocationsMeta: EndpointDefinition<
  VesselLocationsInput,
  VesselLocations
> = {
  api: "wsf-vessels",
  function: "vesselLocations",
  endpoint: "/ferries/api/vessels/rest/vessellocations",
  inputSchema: vesselLocationsInput,
  outputSchema: vesselLocationsSchema,
  sampleParams: {},
  cacheStrategy: "REALTIME",
} as const;

// Type exports
export type VesselLocationsInput = z.infer<typeof vesselLocationsInput>;
