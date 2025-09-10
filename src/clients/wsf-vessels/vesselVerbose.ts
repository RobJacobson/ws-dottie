import { z } from "zod";
import { vesselVerboseArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselVerbose */
export const getVesselVerboseParamsSchema = z.object({});

/** GetVesselVerbose params type */
export type GetVesselVerboseParams = z.infer<
  typeof getVesselVerboseParamsSchema
>;

/** Endpoint definition for getVesselVerbose */
export const getVesselVerboseDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselVerbose",
  endpoint: "/ferries/api/vessels/rest/vesselverbose",
  inputSchema: getVesselVerboseParamsSchema,
  outputSchema: vesselVerboseArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
