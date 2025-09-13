import { z } from "zod";
import { vesselStatsSchema } from "@/schemas/wsf-vessels";

/** Input schema for getVesselStatsById */
const vesselStatsByIdInput = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselStatsById */
export const getVesselStatsByIdMeta = {
  api: "wsf-vessels",
  function: "getVesselStatsById",
  endpoint: "/ferries/api/vessels/rest/vesselstats/{vesselId}",
  inputSchema: vesselStatsByIdInput,
  outputSchema: vesselStatsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type VesselStatsByIdInput = z.infer<typeof vesselStatsByIdInput>;
