import { z } from "zod";
import { vesselHistoryArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";
import { getHistoricalDateRange } from "@/shared/utils/dateUtils";

const dateRangeParams = {
  dateStart: z.date(),
  dateEnd: z.date(),
};

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

/** Params schema for getVesselHistoryByVesselAndDateRange */
export const getVesselHistoryByVesselAndDateRangeParamsSchema = z.object({
  vesselName: vesselNameParam,
  ...dateRangeParams,
});

/** GetVesselHistoryByVesselAndDateRange params type */
export type GetVesselHistoryByVesselAndDateRangeParams = z.infer<
  typeof getVesselHistoryByVesselAndDateRangeParamsSchema
>;

/** Endpoint definition for getVesselHistoryByVesselAndDateRange */
export const getVesselHistoryByVesselAndDateRangeDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselHistoryByVesselAndDateRange",
  endpoint:
    "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}",
  inputSchema: getVesselHistoryByVesselAndDateRangeParamsSchema,
  outputSchema: vesselHistoryArraySchema,
  sampleParams: {
    vesselName: "Cathlamet",
    dateStart: getHistoricalDateRange().startOfMonth,
    dateEnd: getHistoricalDateRange().endOfMonth,
  },
  cacheStrategy: "DAILY_STATIC",
});
