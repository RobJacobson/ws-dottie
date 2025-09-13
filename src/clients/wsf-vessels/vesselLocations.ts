import { z } from "zod";
import {
  vesselLocationsSchema,
  type VesselLocations,
} from "@/schemas/wsf-vessels/vesselLocations.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselLocations */
const vesselLocationsInput = z.object({});

/** Endpoint metadata for getVesselLocations */
export const getVesselLocationsMeta: Endpoint<
  VesselLocationsInput,
  VesselLocations
> = {
  api: "wsf-vessels",
  function: "getVesselLocations",
  endpoint: "/ferries/api/vessels/rest/vessellocations",
  inputSchema: vesselLocationsInput,
  outputSchema: vesselLocationsSchema,
  sampleParams: {},
  cacheStrategy: "REALTIME_UPDATES",
} as const;

// Type exports
export type VesselLocationsInput = z.infer<typeof vesselLocationsInput>;
