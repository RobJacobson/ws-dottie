import { z } from "zod";
import {
  type VesselsStats,
  vesselsStatsSchema,
} from "@/schemas/wsf-vessels/vesselStats.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselStatsById */
const vesselsStatsByIdInput = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselStatsById */
export const getVesselStatsByIdMeta: Endpoint<
  VesselsStatsByIdInput,
  VesselsStats
> = {
  endpoint: "/ferries/api/vessels/rest/vesselstats/{vesselId}",
  inputSchema: vesselsStatsByIdInput,
  outputSchema: vesselsStatsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type VesselsStatsByIdInput = z.infer<typeof vesselsStatsByIdInput>;
