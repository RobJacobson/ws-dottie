import { z } from "zod";
import { type VesselStats, vesselStatsSchema } from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
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

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselstats/{vesselId}";

export const getVesselStatsById = zodFetch<
  GetVesselStatsByIdParams,
  VesselStats
>(ENDPOINT_BY_ID, getVesselStatsByIdParamsSchema, vesselStatsSchema);

export const vesselStatsByIdOptions = createQueryOptions({
  apiFunction: getVesselStatsById,
  queryKey: ["wsf", "vessels", "stats", "getVesselStatsById"],
  cacheStrategy: "DAILY_STATIC",
});
