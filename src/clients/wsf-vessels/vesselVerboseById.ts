import { z } from "zod";
import { vesselVerboseSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselVerboseById */
const getVesselVerboseByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** GetVesselVerboseById params type */

/** Endpoint definition for getVesselVerboseById */
export const getVesselVerboseByIdDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselVerboseById",
  endpoint: "/ferries/api/vessels/rest/vesselverbose/{vesselId}",
  inputSchema: getVesselVerboseByIdParamsSchema,
  outputSchema: vesselVerboseSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
