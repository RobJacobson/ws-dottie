import { z } from "zod";
import {
  type VesselAccommodationsArray,
  vesselAccommodationsArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselAccommodationsParamsSchema = z.object({});

export type GetVesselAccommodationsParams = z.infer<
  typeof getVesselAccommodationsParamsSchema
>;

export { vesselAccommodationsArraySchema };
export type { VesselAccommodationsArray };

export const getVesselAccommodations = async (
  params: GetVesselAccommodationsParams
): Promise<VesselAccommodationsArray> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselaccommodations",
    inputSchema: getVesselAccommodationsParamsSchema,
    outputSchema: vesselAccommodationsArraySchema,
    params,
  });

export const vesselAccommodationsOptions = createQueryOptions({
  apiFunction: getVesselAccommodations,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodations"],
  cacheStrategy: "DAILY_STATIC",
});
