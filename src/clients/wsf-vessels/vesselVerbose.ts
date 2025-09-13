import { z } from "zod";
import { vesselVerbosesSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getVesselVerbose */
const vesselVerboseInput = z.object({});

/** Endpoint metadata for getVesselVerbose */
export const getVesselVerboseMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselVerbose",
  endpoint: "/ferries/api/vessels/rest/vesselverbose",
  inputSchema: vesselVerboseInput,
  outputSchema: vesselVerbosesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type VesselVerboseInput = z.infer<typeof vesselVerboseInput>;
