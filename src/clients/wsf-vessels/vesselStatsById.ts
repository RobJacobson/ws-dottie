import { z } from "zod";
import { vesselStatsSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselStatsById */
export const getVesselStatsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** GetVesselStatsById params type */
export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;

/** Endpoint definition for getVesselStatsById */
export const getVesselStatsByIdDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselStatsById",
  endpoint: "/ferries/api/vessels/rest/vesselstats/{vesselId}",
  inputSchema: getVesselStatsByIdParamsSchema,
  outputSchema: vesselStatsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
