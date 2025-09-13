import { z } from "zod";
import { vesselBasicsSchema } from "@/schemas/wsf-vessels";

/** Input schema for getVesselBasicsById */
const vesselBasicsByIdInput = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselBasicsById */
export const getVesselBasicsByIdMeta = {
  api: "wsf-vessels",
  function: "getVesselBasicsById",
  endpoint: "/ferries/api/vessels/rest/vesselbasics/{vesselId}",
  inputSchema: vesselBasicsByIdInput,
  outputSchema: vesselBasicsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdInput>;
