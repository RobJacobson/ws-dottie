import { z } from "zod";

import {
  type VesselHistories,
  vesselHistoriesSchema,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils/dateUtils";

const vesselNameParam = z.string().min(1, "Vessel name cannot be empty");

/** Input schema for getVesselHistoryByVesselAndDateRange */
const vesselHistoriesByVesselAndDateRangeInput = z.object({
  VesselName: z.string().min(1, "Vessel name cannot be empty"),
  DateStart: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  DateEnd: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getVesselHistoryByVesselAndDateRange */
export const getVesselHistoryByVesselAndDateRangeMeta: EndpointDefinition<
  VesselHistoryByVesselAndDateRangeInput,
  VesselHistories
> = {
  api: "wsf-vessels",
  function: "vesselHistoriesByVesselAndDateRange",
  endpoint:
    "/ferries/api/vessels/rest/vesselhistory/{VesselName}/{DateStart}/{DateEnd}",
  inputSchema: vesselHistoriesByVesselAndDateRangeInput,
  outputSchema: vesselHistoriesSchema,
  sampleParams: {
    VesselName: "Cathlamet",
    DateStart: datesHelper.startOfMonth(),
    DateEnd: datesHelper.endOfMonth(),
  },
  cacheStrategy: "STATIC",
} as const;

// Type exports
export type VesselHistoryByVesselAndDateRangeInput = z.infer<
  typeof vesselHistoriesByVesselAndDateRangeInput
>;
