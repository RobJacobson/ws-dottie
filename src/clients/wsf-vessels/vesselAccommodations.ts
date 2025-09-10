import { z } from "zod";
import { vesselAccommodationsArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselAccommodations */
export const getVesselAccommodationsParamsSchema = z.object({});

/** GetVesselAccommodations params type */
export type GetVesselAccommodationsParams = z.infer<
  typeof getVesselAccommodationsParamsSchema
>;

/** Endpoint definition for getVesselAccommodations */
export const getVesselAccommodationsDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselAccommodations",
  endpoint: "/ferries/api/vessels/rest/vesselaccommodations",
  inputSchema: getVesselAccommodationsParamsSchema,
  outputSchema: vesselAccommodationsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
