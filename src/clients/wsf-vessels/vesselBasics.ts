import { z } from "zod";
import {
  type VesselBasicsArray,
  vesselBasicsArraySchema,
  vesselClassSchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselBasicsParamsSchema = z.object({});

export type GetVesselBasicsParams = z.infer<typeof getVesselBasicsParamsSchema>;

export { vesselBasicsArraySchema, vesselClassSchema };
export type { VesselBasicsArray };

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselbasics";

export const getVesselBasics = zodFetch<
  GetVesselBasicsParams,
  VesselBasicsArray
>(ENDPOINT_ALL, getVesselBasicsParamsSchema, vesselBasicsArraySchema);

export const vesselBasicsOptions = createQueryOptions({
  apiFunction: getVesselBasics,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasics"],
  cacheStrategy: "DAILY_STATIC",
});
