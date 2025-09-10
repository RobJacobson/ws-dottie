import { z } from "zod";
import {
  vesselBasicsArraySchema,
  vesselClassSchema,
} from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselBasics */
export const getVesselBasicsParamsSchema = z.object({});

/** GetVesselBasics params type */
export type GetVesselBasicsParams = z.infer<typeof getVesselBasicsParamsSchema>;

/** Endpoint definition for getVesselBasics */
export const getVesselBasicsDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getVesselBasics",
  endpoint: "/ferries/api/vessels/rest/vesselbasics",
  inputSchema: getVesselBasicsParamsSchema,
  outputSchema: vesselBasicsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

export { vesselClassSchema };
