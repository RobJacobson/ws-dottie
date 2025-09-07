import { z } from "zod";
import { type VesselBasics, vesselBasicsSchema } from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
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

export const getVesselBasicsById = async (
  params: GetVesselBasicsByIdParams
): Promise<VesselBasics> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselbasics/{vesselId}",
    inputSchema: getVesselBasicsByIdParamsSchema,
    outputSchema: vesselBasicsSchema,
    params,
  });

export const vesselBasicsByIdOptions = createQueryOptions({
  apiFunction: getVesselBasicsById,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasicsById"],
  cacheStrategy: "DAILY_STATIC",
});
