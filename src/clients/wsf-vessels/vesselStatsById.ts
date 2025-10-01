import { z } from "zod";

import {
  type VesselStats,
  vesselStatsSchema,
} from "@/schemas/wsf-vessels/vesselStats.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselStatsById */
const vesselsStatsByIdInput = z.object({
  VesselID: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselStatsById */
export const getVesselStatsByIdMeta: EndpointDefinition<
  VesselsStatsByIdInput,
  VesselStats
> = {
  api: "wsf-vessels",
  function: "vesselStatsById",
  endpoint: "/ferries/api/vessels/rest/vesselstats/{VesselID}",
  inputSchema: vesselsStatsByIdInput,
  outputSchema: vesselStatsSchema,
  sampleParams: { VesselID: 32 },
  cacheStrategy: "STATIC",
} as const;

// Type exports
export type VesselsStatsByIdInput = z.infer<typeof vesselsStatsByIdInput>;
