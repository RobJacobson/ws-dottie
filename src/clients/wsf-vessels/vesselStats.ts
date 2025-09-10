import { z } from "zod";
import {
  vesselClassSchema,
  vesselStatsArraySchema,
} from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselStats */
export const getVesselStatsParamsSchema = z.object({});

/** GetVesselStats params type */
export type GetVesselStatsParams = z.infer<typeof getVesselStatsParamsSchema>;

/** Endpoint definition for getVesselStats */
export const getVesselStatsDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselStats",
  endpoint: "/ferries/api/vessels/rest/vesselstats",
  inputSchema: getVesselStatsParamsSchema,
  outputSchema: vesselStatsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

export { vesselClassSchema };
