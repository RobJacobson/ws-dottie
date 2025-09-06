import { z } from "zod";
import {
  type VesselHistoryArray as VesselHistoryArrayType,
  vesselHistoryArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

const dateRangeParams = {
  dateStart: z.date(),
  dateEnd: z.date(),
};

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

export const getVesselHistoryByVesselAndDateRangeParamsSchema = z
  .object({
    vesselName: vesselNameParam,
    ...dateRangeParams,
  });

export type GetVesselHistoryByVesselAndDateRangeParams = z.infer<
  typeof getVesselHistoryByVesselAndDateRangeParamsSchema
>;

const ENDPOINT_SPECIFIC =
  "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}";

export const getVesselHistoryByVesselAndDateRange = zodFetch<
  GetVesselHistoryByVesselAndDateRangeParams,
  VesselHistoryArrayType
>(
  ENDPOINT_SPECIFIC,
  getVesselHistoryByVesselAndDateRangeParamsSchema,
  vesselHistoryArraySchema
);

export const vesselHistoryByVesselAndDateRangeOptions = createQueryOptions({
  apiFunction: getVesselHistoryByVesselAndDateRange,
  queryKey: [
    "wsf",
    "vessels",
    "history",
    "getVesselHistoryByVesselAndDateRange",
  ],
  cacheStrategy: "DAILY_STATIC",
});
