import { z } from "zod";
import {
  type VesselStatsArray,
  vesselClassSchema,
  vesselStatsArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselStatsParamsSchema = z.object({});

export type GetVesselStatsParams = z.infer<typeof getVesselStatsParamsSchema>;

export { vesselStatsArraySchema, vesselClassSchema };
export type { VesselStatsArray };

export const getVesselStats = async (
  params: GetVesselStatsParams
): Promise<VesselStatsArray> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselstats",
    inputSchema: getVesselStatsParamsSchema,
    outputSchema: vesselStatsArraySchema,
    params,
  });

export const vesselStatsOptions = createQueryOptions({
  apiFunction: getVesselStats,
  queryKey: ["wsf", "vessels", "stats", "getVesselStats"],
  cacheStrategy: "DAILY_STATIC",
});
