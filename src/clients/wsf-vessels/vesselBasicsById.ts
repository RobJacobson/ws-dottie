import { z } from "zod";
import { type VesselBasics, vesselBasicsSchema } from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselBasicsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselBasicsByIdParams = z.infer<
  typeof getVesselBasicsByIdParamsSchema
>;

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselbasics/{vesselId}";

export const getVesselBasicsById = zodFetch<
  GetVesselBasicsByIdParams,
  VesselBasics
>(ENDPOINT_BY_ID, getVesselBasicsByIdParamsSchema, vesselBasicsSchema);

export const vesselBasicsByIdOptions = createQueryOptions({
  apiFunction: getVesselBasicsById,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasicsById"],
  cacheStrategy: "DAILY_STATIC",
});
