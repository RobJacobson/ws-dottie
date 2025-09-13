import { z } from "zod";
import {
  vesselHistoriesSchema,
  type VesselHistories,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import { datesHelper } from "@/shared/utils/dateUtils";
import type { Endpoint } from "@/shared/endpoints";

const dateRangeParams = {
  dateStart: z.date(),
  dateEnd: z.date(),
};

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

/** Input schema for getVesselHistoryByVesselAndDateRange */
const vesselHistoriesByVesselAndDateRangeInput = z.object({
  vesselName: vesselNameParam,
  ...dateRangeParams,
});

/** Endpoint metadata for getVesselHistoryByVesselAndDateRange */
export const getVesselHistoryByVesselAndDateRangeMeta: Endpoint<
  VesselHistoryByVesselAndDateRangeInput,
  VesselHistories
> = {
  api: "wsf-vessels",
  function: "getVesselHistoryByVesselAndDateRange",
  endpoint:
    "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}",
  inputSchema: vesselHistoriesByVesselAndDateRangeInput,
  outputSchema: vesselHistoriesSchema,
  sampleParams: {
    vesselName: "Cathlamet",
    dateStart: datesHelper.startOfMonth(),
    dateEnd: datesHelper.endOfMonth(),
  },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type VesselHistoryByVesselAndDateRangeInput = z.infer<
  typeof vesselHistoriesByVesselAndDateRangeInput
>;
