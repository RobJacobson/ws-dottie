import { z } from "zod";
import {
  type VesselVerboseArray as ImportedVesselVerboseArray,
  vesselVerboseArraySchema as importedVesselVerboseArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getVesselVerboseParamsSchema = z.object({});

export type GetVesselVerboseParams = z.infer<
  typeof getVesselVerboseParamsSchema
>;

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselverbose";

export const getVesselVerbose = zodFetch<
  GetVesselVerboseParams,
  ImportedVesselVerboseArray
>(ENDPOINT_ALL, getVesselVerboseParamsSchema, importedVesselVerboseArraySchema);

export const vesselVerboseOptions = createQueryOptions({
  apiFunction: getVesselVerbose,
  queryKey: ["wsf", "vessels", "verbose", "getVesselVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
