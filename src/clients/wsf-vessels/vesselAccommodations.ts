import { z } from "zod";
import { vesselAccommodationsArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselAccommodations */
const getVesselAccommodationsParamsSchema = z.object({});

/** GetVesselAccommodations params type */

/** Endpoint definition for getVesselAccommodations */
export const getVesselAccommodationsDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselAccommodations",
  endpoint: "/ferries/api/vessels/rest/vesselaccommodations",
  inputSchema: getVesselAccommodationsParamsSchema,
  outputSchema: vesselAccommodationsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
