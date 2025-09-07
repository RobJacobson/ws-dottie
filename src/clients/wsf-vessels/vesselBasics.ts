import { z } from "zod";
import {
  type VesselBasicsArray,
  vesselBasicsArraySchema,
  vesselClassSchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselBasicsParamsSchema = z.object({});

export type GetVesselBasicsParams = z.infer<typeof getVesselBasicsParamsSchema>;

export { vesselBasicsArraySchema, vesselClassSchema };
export type { VesselBasicsArray };

export const getVesselBasics = async (
  params: GetVesselBasicsParams
): Promise<VesselBasicsArray> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselbasics",
    inputSchema: getVesselBasicsParamsSchema,
    outputSchema: vesselBasicsArraySchema,
    params,
  });

export const vesselBasicsOptions = createQueryOptions({
  apiFunction: getVesselBasics,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasics"],
  cacheStrategy: "DAILY_STATIC",
});
