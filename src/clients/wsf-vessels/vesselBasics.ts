import { z } from "zod";
import { vesselBasicssSchema, vesselClassSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getVesselBasics */
const vesselBasicsInput = z.object({});

/** Endpoint metadata for getVesselBasics */
export const getVesselBasicsMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselBasics",
  endpoint: "/ferries/api/vessels/rest/vesselbasics",
  inputSchema: vesselBasicsInput,
  outputSchema: vesselBasicssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type VesselBasicsInput = z.infer<typeof vesselBasicsInput>;

export { vesselClassSchema };
