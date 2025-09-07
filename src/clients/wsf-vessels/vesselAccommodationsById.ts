import { z } from "zod";
import {
  type VesselAccommodations,
  vesselAccommodationsSchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
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

export const getVesselAccommodationsById = async (
  params: GetVesselAccommodationsByIdParams
): Promise<VesselAccommodations> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}",
    inputSchema: getVesselAccommodationsByIdParamsSchema,
    outputSchema: vesselAccommodationsSchema,
    params,
  });

export const vesselAccommodationsByIdOptions = createQueryOptions({
  apiFunction: getVesselAccommodationsById,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodationsById"],
  cacheStrategy: "DAILY_STATIC",
});
