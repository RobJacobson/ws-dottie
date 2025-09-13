import { z } from "zod";
import { vesselLocationssSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getVesselLocations */
const vesselLocationsInput = z.object({});

/** Endpoint metadata for getVesselLocations */
export const getVesselLocationsMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselLocations",
  endpoint: "/ferries/api/vessels/rest/vessellocations",
  inputSchema: vesselLocationsInput,
  outputSchema: vesselLocationssSchema,
  sampleParams: {},
  cacheStrategy: "REALTIME_UPDATES",
});

// Type exports (ONLY input types, NO output types)
export type VesselLocationsInput = z.infer<typeof vesselLocationsInput>;
