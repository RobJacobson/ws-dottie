import { z } from "zod";
import { vesselLocationsArraySchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselLocations */
export const getVesselLocationsParamsSchema = z.object({});

/** GetVesselLocations params type */
export type GetVesselLocationsParams = z.infer<
  typeof getVesselLocationsParamsSchema
>;

/** Endpoint definition for getVesselLocations */
export const getVesselLocationsDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselLocations",
  endpoint: "/ferries/api/vessels/rest/vessellocations",
  inputSchema: getVesselLocationsParamsSchema,
  outputSchema: vesselLocationsArraySchema,
  sampleParams: {},
  cacheStrategy: "REALTIME_UPDATES",
});
