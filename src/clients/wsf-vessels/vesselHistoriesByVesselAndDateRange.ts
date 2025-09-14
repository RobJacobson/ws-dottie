import { z } from "zod";
import {
  type VesselHistories,
  vesselHistoriesSchema,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils/dateUtils";

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
export const getVesselHistoryByVesselAndDateRangeMeta: EndpointMeta<
  VesselHistoryByVesselAndDateRangeInput,
  VesselHistories
> = {
  id: "wsf-vessels/vesselHistoriesByVesselAndDateRange",
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
