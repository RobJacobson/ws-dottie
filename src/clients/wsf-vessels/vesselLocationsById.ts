import { z } from "zod";
import {
  type VesselLocations,
  vesselLocationsSchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
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

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vessellocations/{vesselId}";

export const getVesselLocationsByVesselId = zodFetch<
  GetVesselLocationsByVesselIdParams,
  VesselLocations
>(
  ENDPOINT_BY_ID,
  getVesselLocationsByVesselIdParamsSchema,
  vesselLocationsSchema
);

export const vesselLocationsByVesselIdOptions = createQueryOptions({
  apiFunction: getVesselLocationsByVesselId,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocationsByVesselId"],
  cacheStrategy: "REALTIME_UPDATES",
});
