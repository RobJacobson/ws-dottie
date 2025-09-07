import { z } from "zod";
import {
  type VesselVerboseArray as ImportedVesselVerboseArray,
  vesselVerboseArraySchema as importedVesselVerboseArraySchema,
} from "@/schemas/wsf-vessels";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getVesselVerboseParamsSchema = z.object({});

export type GetVesselVerboseParams = z.infer<
  typeof getVesselVerboseParamsSchema
>;

export const getVesselVerbose = async (
  params: GetVesselVerboseParams
): Promise<ImportedVesselVerboseArray> =>
  zodFetch({
    endpoint: "/ferries/api/vessels/rest/vesselverbose",
    inputSchema: getVesselVerboseParamsSchema,
    outputSchema: importedVesselVerboseArraySchema,
    params,
  });

export const vesselVerboseOptions = createQueryOptions({
  apiFunction: getVesselVerbose,
  queryKey: ["wsf", "vessels", "verbose", "getVesselVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
