import { z } from "zod";

import {
  type VesselHistories,
  vesselHistoriesSchema,
} from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselHistories */
const vesselHistoriesInput = z.object({}).strict();

/** Endpoint metadata for getVesselHistories */
export const getVesselHistoriesMeta: EndpointDefinition<
  VesselHistoriesInput,
  VesselHistories
> = {
  api: "wsf-vessels",
  function: "vesselHistories",
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: vesselHistoriesInput,
  outputSchema: vesselHistoriesSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type VesselHistoriesInput = z.infer<typeof vesselHistoriesInput>;
