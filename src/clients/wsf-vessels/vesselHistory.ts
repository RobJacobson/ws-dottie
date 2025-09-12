import { z } from "zod";
import { vesselHistoryArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselHistory */
const getVesselHistoryParamsSchema = z.object({});

/** GetVesselHistory params type */

/** Endpoint definition for getVesselHistory */
export const getVesselHistoryDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselHistory",
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: getVesselHistoryParamsSchema,
  outputSchema: vesselHistoryArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
