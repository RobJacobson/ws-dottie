import { z } from "zod";
import { vesselBasicsSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselBasicsById */
const getVesselBasicsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** GetVesselBasicsById params type */

/** Endpoint definition for getVesselBasicsById */
export const getVesselBasicsByIdDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselBasicsById",
  endpoint: "/ferries/api/vessels/rest/vesselbasics/{vesselId}",
  inputSchema: getVesselBasicsByIdParamsSchema,
  outputSchema: vesselBasicsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
