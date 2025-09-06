import { z } from "zod";
import {
  type VesselAccommodations,
  vesselAccommodationsSchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselAccommodationsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

const ENDPOINT_BY_ID =
  "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";

export const getVesselAccommodationsById = zodFetch<
  GetVesselAccommodationsByIdParams,
  VesselAccommodations
>(
  ENDPOINT_BY_ID,
  getVesselAccommodationsByIdParamsSchema,
  vesselAccommodationsSchema
);

export const vesselAccommodationsByIdOptions = createQueryOptions({
  apiFunction: getVesselAccommodationsById,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodationsById"],
  cacheStrategy: "DAILY_STATIC",
});
