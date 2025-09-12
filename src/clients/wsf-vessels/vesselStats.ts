import { z } from "zod";
import {
  vesselClassSchema,
  vesselStatsArraySchema,
} from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselStats */
const getVesselStatsParamsSchema = z.object({});

/** GetVesselStats params type */

/** Endpoint definition for getVesselStats */
export const getVesselStatsDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselStats",
  endpoint: "/ferries/api/vessels/rest/vesselstats",
  inputSchema: getVesselStatsParamsSchema,
  outputSchema: vesselStatsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

export { vesselClassSchema };
