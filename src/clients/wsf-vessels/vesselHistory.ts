import { z } from "zod";
import {
  type VesselHistoryArray as VesselHistoryArrayType,
  vesselHistoryArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselHistoryParamsSchema = z.object({});

export type GetVesselHistoryParams = z.infer<
  typeof getVesselHistoryParamsSchema
>;

export const getVesselHistory = async (
  params: GetVesselHistoryParams
): Promise<VesselHistoryArrayType> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselhistory",
    inputSchema: getVesselHistoryParamsSchema,
    outputSchema: vesselHistoryArraySchema,
    params,
  });

export const vesselHistoryOptions = createQueryOptions({
  apiFunction: getVesselHistory,
  queryKey: ["wsf", "vessels", "history", "getVesselHistory"],
  cacheStrategy: "DAILY_STATIC",
});
