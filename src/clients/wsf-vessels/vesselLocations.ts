import { z } from "zod";
import { vesselLocationssSchema } from "@/schemas/wsf-vessels";

/** Input schema for getVesselLocations */
const vesselLocationsInput = z.object({});

/** Endpoint metadata for getVesselLocations */
export const getVesselLocationsMeta = {
  api: "wsf-vessels",
  function: "getVesselLocations",
  endpoint: "/ferries/api/vessels/rest/vessellocations",
  inputSchema: vesselLocationsInput,
  outputSchema: vesselLocationssSchema,
  sampleParams: {},
  cacheStrategy: "REALTIME_UPDATES",
} as const;

// Type exports (ONLY input types, NO output types)
export type VesselLocationsInput = z.infer<typeof vesselLocationsInput>;
