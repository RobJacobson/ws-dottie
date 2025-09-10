import { z } from "zod";
import { vesselLocationsSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselLocationsByVesselId */
export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** GetVesselLocationsByVesselId params type */
export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

/** Endpoint definition for getVesselLocationsByVesselId */
export const getVesselLocationsByVesselIdDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselLocationsByVesselId",
  endpoint: "/ferries/api/vessels/rest/vessellocations/{vesselId}",
  inputSchema: getVesselLocationsByVesselIdParamsSchema,
  outputSchema: vesselLocationsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "REALTIME_UPDATES",
});
