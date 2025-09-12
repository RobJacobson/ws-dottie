import { z } from "zod";
import { vesselLocationsArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselLocations */
const getVesselLocationsParamsSchema = z.object({});

/** GetVesselLocations params type */

/** Endpoint definition for getVesselLocations */
export const getVesselLocationsDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselLocations",
  endpoint: "/ferries/api/vessels/rest/vessellocations",
  inputSchema: getVesselLocationsParamsSchema,
  outputSchema: vesselLocationsArraySchema,
  sampleParams: {},
  cacheStrategy: "REALTIME_UPDATES",
});
