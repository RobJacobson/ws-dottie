import { z } from "zod";
import { vesselClassSchema, vesselStatssSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getVesselStats */
const vesselStatsInput = z.object({});

/** Endpoint metadata for getVesselStats */
export const getVesselStatsMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselStats",
  endpoint: "/ferries/api/vessels/rest/vesselstats",
  inputSchema: vesselStatsInput,
  outputSchema: vesselStatssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type VesselStatsInput = z.infer<typeof vesselStatsInput>;

export { vesselClassSchema };
