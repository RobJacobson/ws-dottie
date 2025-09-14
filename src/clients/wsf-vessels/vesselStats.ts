import { z } from "zod";
import {
  type VesselsStats,
  vesselsStatsSchema,
} from "@/schemas/wsf-vessels/vesselStats.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getVesselStats */
const vesselStatsInput = z.object({});

/** Endpoint metadata for getVesselStats */
export const getVesselStatsMeta: EndpointMeta<VesselStatsInput, VesselsStats> =
  {
    id: "wsf-vessels/vesselStats",
    endpoint: "/ferries/api/vessels/rest/vesselstats",
    inputSchema: vesselStatsInput,
    outputSchema: vesselsStatsSchema,
    sampleParams: {},
    cacheStrategy: "DAILY_STATIC",
  } as const;

// Type exports
export type VesselStatsInput = z.infer<typeof vesselStatsInput>;
