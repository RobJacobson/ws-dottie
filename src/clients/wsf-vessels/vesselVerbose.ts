import { z } from "zod";
import { vesselVerboseArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselVerbose */
const getVesselVerboseParamsSchema = z.object({});

/** GetVesselVerbose params type */

/** Endpoint definition for getVesselVerbose */
export const getVesselVerboseDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselVerbose",
  endpoint: "/ferries/api/vessels/rest/vesselverbose",
  inputSchema: getVesselVerboseParamsSchema,
  outputSchema: vesselVerboseArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
