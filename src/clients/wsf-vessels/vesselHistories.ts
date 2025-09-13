import { z } from "zod";
import {
  vesselHistoriesSchema,
  type VesselHistories,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselHistories */
const vesselHistoriesInput = z.object({});

/** Endpoint metadata for getVesselHistories */
export const getVesselHistoriesMeta: Endpoint<
  VesselHistoriesInput,
  VesselHistories
> = {
  api: "wsf-vessels",
  function: "getVesselHistories",
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: vesselHistoriesInput,
  outputSchema: vesselHistoriesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type VesselHistoriesInput = z.infer<typeof vesselHistoriesInput>;
