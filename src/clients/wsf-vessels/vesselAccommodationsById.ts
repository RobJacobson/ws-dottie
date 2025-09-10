import { z } from "zod";
import { vesselAccommodationsSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselAccommodationsById */
export const getVesselAccommodationsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** GetVesselAccommodationsById params type */
export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

/** Endpoint definition for getVesselAccommodationsById */
export const getVesselAccommodationsByIdDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselAccommodationsById",
  endpoint: "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}",
  inputSchema: getVesselAccommodationsByIdParamsSchema,
  outputSchema: vesselAccommodationsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
