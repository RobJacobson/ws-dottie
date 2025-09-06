import { z } from "zod";
import {
  type VesselVerbose as ImportedVesselVerbose,
  vesselVerboseSchema as importedVesselVerboseSchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselVerboseByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselVerboseByIdParams = z.infer<
  typeof getVesselVerboseByIdParamsSchema
>;

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselverbose/{vesselId}";

export const getVesselVerboseById = zodFetch<
  GetVesselVerboseByIdParams,
  ImportedVesselVerbose
>(
  ENDPOINT_BY_ID,
  getVesselVerboseByIdParamsSchema,
  importedVesselVerboseSchema
);

export const vesselVerboseByIdOptions = createQueryOptions({
  apiFunction: getVesselVerboseById,
  queryKey: ["wsf", "vessels", "verbose", "getVesselVerboseById"],
  cacheStrategy: "DAILY_STATIC",
});
