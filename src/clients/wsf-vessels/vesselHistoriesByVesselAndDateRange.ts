import { z } from "zod";

import {
  type VesselHistories,
  vesselHistoriesSchema,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils/dateUtils";

const dateRangeParams = {
  dateStart: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  dateEnd: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
};

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

/** Input schema for getVesselHistoryByVesselAndDateRange */
const vesselHistoriesByVesselAndDateRangeInput = z.object({
  vesselName: vesselNameParam,
  ...dateRangeParams,
});

/** Endpoint metadata for getVesselHistoryByVesselAndDateRange */
export const getVesselHistoryByVesselAndDateRangeMeta: EndpointDefinition<
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
  cacheStrategy: "STATIC",
} as const;

// Type exports
export type VesselHistoryByVesselAndDateRangeInput = z.infer<
  typeof vesselHistoriesByVesselAndDateRangeInput
>;
