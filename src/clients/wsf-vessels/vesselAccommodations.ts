import { z } from "zod";
import {
  type VesselAccommodationsArray,
  vesselAccommodationsArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselAccommodationsParamsSchema = z.object({});

export type GetVesselAccommodationsParams = z.infer<
  typeof getVesselAccommodationsParamsSchema
>;

export { vesselAccommodationsArraySchema };
export type { VesselAccommodationsArray };

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselaccommodations";

export const getVesselAccommodations = zodFetch<
  GetVesselAccommodationsParams,
  VesselAccommodationsArray
>(
  ENDPOINT_ALL,
  getVesselAccommodationsParamsSchema,
  vesselAccommodationsArraySchema
);

export const vesselAccommodationsOptions = createQueryOptions({
  apiFunction: getVesselAccommodations,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodations"],
  cacheStrategy: "DAILY_STATIC",
});
