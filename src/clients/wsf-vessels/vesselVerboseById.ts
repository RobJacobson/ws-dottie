import { z } from "zod";
import { vesselVerboseSchema } from "@/schemas/wsf-vessels";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getVesselVerboseById */
const vesselVerboseByIdInput = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselVerboseById */
export const getVesselVerboseByIdMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getVesselVerboseById",
  endpoint: "/ferries/api/vessels/rest/vesselverbose/{vesselId}",
  inputSchema: vesselVerboseByIdInput,
  outputSchema: vesselVerboseSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type VesselVerboseByIdInput = z.infer<typeof vesselVerboseByIdInput>;
