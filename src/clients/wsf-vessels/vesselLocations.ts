import { z } from "zod";
import {
  type VesselLocationsArray,
  vesselLocationsArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselLocationsParamsSchema = z.object({});

export type GetVesselLocationsParams = z.infer<
  typeof getVesselLocationsParamsSchema
>;

export { vesselLocationsArraySchema };
export type { VesselLocationsArray };

export const getVesselLocations = async (
  params: GetVesselLocationsParams
): Promise<VesselLocationsArray> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vessellocations",
    inputSchema: getVesselLocationsParamsSchema,
    outputSchema: vesselLocationsArraySchema,
    params,
  });

export const vesselLocationsOptions = createQueryOptions({
  apiFunction: getVesselLocations,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocations"],
  cacheStrategy: "REALTIME_UPDATES",
});
