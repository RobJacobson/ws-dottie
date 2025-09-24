import { z } from "zod";

import {
  type VesselsStats,
  vesselsStatsSchema,
} from "@/schemas/wsf-vessels/vesselStats.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselStats */
const vesselStatsInput = z.object({}).strict();

/** Endpoint metadata for getVesselStats */
export const getVesselStatsMeta: EndpointDefinition<
  VesselStatsInput,
  VesselsStats
> = {
  id: "wsf-vessels:vesselStats",
  endpoint: "/ferries/api/vessels/rest/vesselstats",
  inputSchema: vesselStatsInput,
  outputSchema: vesselsStatsSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
} as const;

// Type exports
export type VesselStatsInput = z.infer<typeof vesselStatsInput>;
