import { z } from "zod";
import {
  type VesselStatsArray,
  vesselClassSchema,
  vesselStatsArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselStatsParamsSchema = z.object({});

export type GetVesselStatsParams = z.infer<typeof getVesselStatsParamsSchema>;

export { vesselStatsArraySchema, vesselClassSchema };
export type { VesselStatsArray };

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselstats";

export const getVesselStats = zodFetch<GetVesselStatsParams, VesselStatsArray>(
  ENDPOINT_ALL,
  getVesselStatsParamsSchema,
  vesselStatsArraySchema
);

export const vesselStatsOptions = createQueryOptions({
  apiFunction: getVesselStats,
  queryKey: ["wsf", "vessels", "stats", "getVesselStats"],
  cacheStrategy: "DAILY_STATIC",
});
