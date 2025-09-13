import { z } from "zod";
import {
  type VesselsStats,
  vesselsStatsSchema,
} from "@/schemas/wsf-vessels/vesselStats.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselStats */
const vesselStatsInput = z.object({});

/** Endpoint metadata for getVesselStats */
export const getVesselStatsMeta: Endpoint<VesselStatsInput, VesselsStats> = {
  endpoint: "/ferries/api/vessels/rest/vesselstats",
  inputSchema: vesselStatsInput,
  outputSchema: vesselsStatsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type VesselStatsInput = z.infer<typeof vesselStatsInput>;
