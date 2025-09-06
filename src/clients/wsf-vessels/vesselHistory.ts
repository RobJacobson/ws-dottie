import { z } from "zod";
import {
  type VesselHistoryArray as VesselHistoryArrayType,
  vesselHistoryArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselHistoryParamsSchema = z.object({});

export type GetVesselHistoryParams = z.infer<
  typeof getVesselHistoryParamsSchema
>;

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselhistory";

export const getVesselHistory = zodFetch<
  GetVesselHistoryParams,
  VesselHistoryArrayType
>(ENDPOINT_ALL, getVesselHistoryParamsSchema, vesselHistoryArraySchema);

export const vesselHistoryOptions = createQueryOptions({
  apiFunction: getVesselHistory,
  queryKey: ["wsf", "vessels", "history", "getVesselHistory"],
  cacheStrategy: "DAILY_STATIC",
});
