import { z } from "zod";
import {
  type VesselHistories,
  vesselHistoriesSchema,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselHistories */
const vesselHistoriesInput = z.object({});

/** Endpoint metadata for getVesselHistories */
export const getVesselHistoriesMeta: Endpoint<
  VesselHistoriesInput,
  VesselHistories
> = {
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: vesselHistoriesInput,
  outputSchema: vesselHistoriesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type VesselHistoriesInput = z.infer<typeof vesselHistoriesInput>;
