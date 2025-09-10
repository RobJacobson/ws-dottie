import { z } from "zod";
import { vesselHistoryArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselHistory */
export const getVesselHistoryParamsSchema = z.object({});

/** GetVesselHistory params type */
export type GetVesselHistoryParams = z.infer<
  typeof getVesselHistoryParamsSchema
>;

/** Endpoint definition for getVesselHistory */
export const getVesselHistoryDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselHistory",
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: getVesselHistoryParamsSchema,
  outputSchema: vesselHistoryArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
