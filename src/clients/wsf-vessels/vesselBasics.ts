import { z } from "zod";
import {
  vesselBasicsArraySchema,
  vesselClassSchema,
} from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getVesselBasics */
const getVesselBasicsParamsSchema = z.object({});

/** GetVesselBasics params type */

/** Endpoint definition for getVesselBasics */
export const getVesselBasicsDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselBasics",
  endpoint: "/ferries/api/vessels/rest/vesselbasics",
  inputSchema: getVesselBasicsParamsSchema,
  outputSchema: vesselBasicsArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

export { vesselClassSchema };
