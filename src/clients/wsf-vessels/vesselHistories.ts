import { z } from "zod";
import {
  type VesselHistories,
  vesselHistoriesSchema,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getVesselHistories */
const vesselHistoriesInput = z.object({});

/** Endpoint metadata for getVesselHistories */
export const getVesselHistoriesMeta: EndpointMeta<
  VesselHistoriesInput,
  VesselHistories
> = {
  id: "wsf-vessels/vesselHistories",
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: vesselHistoriesInput,
  outputSchema: vesselHistoriesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type VesselHistoriesInput = z.infer<typeof vesselHistoriesInput>;
