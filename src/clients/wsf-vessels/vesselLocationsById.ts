import { z } from "zod";
import {
  type VesselLocations,
  vesselLocationsSchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

export const getVesselLocationsByVesselId = async (
  params: GetVesselLocationsByVesselIdParams
): Promise<VesselLocations> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vessellocations/{vesselId}",
    inputSchema: getVesselLocationsByVesselIdParamsSchema,
    outputSchema: vesselLocationsSchema,
    params,
  });

export const vesselLocationsByVesselIdOptions = createQueryOptions({
  apiFunction: getVesselLocationsByVesselId,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocationsByVesselId"],
  cacheStrategy: "REALTIME_UPDATES",
});
