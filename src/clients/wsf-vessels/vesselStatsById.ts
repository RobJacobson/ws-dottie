import { z } from "zod";
import { type VesselStats, vesselStatsSchema } from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselStatsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;

export const getVesselStatsById = async (
  params: GetVesselStatsByIdParams
): Promise<VesselStats> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselstats/{vesselId}",
    inputSchema: getVesselStatsByIdParamsSchema,
    outputSchema: vesselStatsSchema,
    params,
  });

export const vesselStatsByIdOptions = createQueryOptions({
  apiFunction: getVesselStatsById,
  queryKey: ["wsf", "vessels", "stats", "getVesselStatsById"],
  cacheStrategy: "DAILY_STATIC",
});
