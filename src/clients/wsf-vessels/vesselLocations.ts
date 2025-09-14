import { z } from "zod";
import {
  type VesselLocations,
  vesselLocationsSchema,
} from "@/schemas/wsf-vessels/vesselLocations.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getVesselLocations */
const vesselLocationsInput = z.object({});

/** Endpoint metadata for getVesselLocations */
export const getVesselLocationsMeta: EndpointMeta<
  VesselLocationsInput,
  VesselLocations
> = {
  id: "wsf-vessels/vesselLocations",
  endpoint: "/ferries/api/vessels/rest/vessellocations",
  inputSchema: vesselLocationsInput,
  outputSchema: vesselLocationsSchema,
  sampleParams: {},
  cacheStrategy: "REALTIME_UPDATES",
} as const;

// Type exports
export type VesselLocationsInput = z.infer<typeof vesselLocationsInput>;
