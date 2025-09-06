import { z } from "zod";
import {
  type VesselLocationsArray,
  vesselLocationsArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselLocationsParamsSchema = z.object({});

export type GetVesselLocationsParams = z.infer<
  typeof getVesselLocationsParamsSchema
>;

export { vesselLocationsArraySchema };
export type { VesselLocationsArray };

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vessellocations";

export const getVesselLocations = zodFetch<
  GetVesselLocationsParams,
  VesselLocationsArray
>(ENDPOINT_ALL, getVesselLocationsParamsSchema, vesselLocationsArraySchema);

export const vesselLocationsOptions = createQueryOptions({
  apiFunction: getVesselLocations,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocations"],
  cacheStrategy: "REALTIME_UPDATES",
});
