import { z } from "zod";
import { vesselHistoryArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils/dateUtils";

const dateRangeParams = {
  dateStart: z.date(),
  dateEnd: z.date(),
};

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

/** Params schema for getVesselHistoryByVesselAndDateRange */
const getVesselHistoryByVesselAndDateRangeParamsSchema = z.object({
  vesselName: vesselNameParam,
  ...dateRangeParams,
});

/** GetVesselHistoryByVesselAndDateRange params type */

/** Endpoint definition for getVesselHistoryByVesselAndDateRange */
export const getVesselHistoryByVesselAndDateRangeDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselHistoryByVesselAndDateRange",
  endpoint:
    "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}",
  inputSchema: getVesselHistoryByVesselAndDateRangeParamsSchema,
  outputSchema: vesselHistoryArraySchema,
  sampleParams: {
    vesselName: "Cathlamet",
    dateStart: datesHelper.startOfMonth(),
    dateEnd: datesHelper.endOfMonth(),
  },
  cacheStrategy: "DAILY_STATIC",
});
