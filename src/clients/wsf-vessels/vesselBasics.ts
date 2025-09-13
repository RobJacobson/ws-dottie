import { z } from "zod";
import { vesselBasicssSchema, vesselClassSchema } from "@/schemas/wsf-vessels";

/** Input schema for getVesselBasics */
const vesselBasicsInput = z.object({});

/** Endpoint metadata for getVesselBasics */
export const getVesselBasicsMeta = {
  api: "wsf-vessels",
  function: "getVesselBasics",
  endpoint: "/ferries/api/vessels/rest/vesselbasics",
  inputSchema: vesselBasicsInput,
  outputSchema: vesselBasicssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type VesselBasicsInput = z.infer<typeof vesselBasicsInput>;

export { vesselClassSchema };
