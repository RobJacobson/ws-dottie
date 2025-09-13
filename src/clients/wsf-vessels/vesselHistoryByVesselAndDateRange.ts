import { z } from "zod";
import { vesselHistorysSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils/dateUtils";

const dateRangeParams = {
  dateStart: z.date(),
  dateEnd: z.date(),
};

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

/** Input schema for getVesselHistoryByVesselAndDateRange */
const vesselHistoryByVesselAndDateRangeInput = z.object({
  vesselName: vesselNameParam,
  ...dateRangeParams,
});

/** Endpoint metadata for getVesselHistoryByVesselAndDateRange */
export const getVesselHistoryByVesselAndDateRangeMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselHistoryByVesselAndDateRange",
  endpoint:
    "/ferries/api/vessels/rest/vesselhistory/{vesselName}/{dateStart}/{dateEnd}",
  inputSchema: vesselHistoryByVesselAndDateRangeInput,
  outputSchema: vesselHistorysSchema,
  sampleParams: {
    vesselName: "Cathlamet",
    dateStart: datesHelper.startOfMonth(),
    dateEnd: datesHelper.endOfMonth(),
  },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type VesselHistoryByVesselAndDateRangeInput = z.infer<
  typeof vesselHistoryByVesselAndDateRangeInput
>;
