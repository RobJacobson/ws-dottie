import { z } from "zod";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "@/schemas/wsf-vessels/vesselVerbose.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselVerboseById */
const vesselsVerboseByIdInput = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselVerboseById */
export const getVesselsVerboseByIdMeta: EndpointDefinition<
  VesselsVerboseByIdInput,
  VesselVerbose
> = {
  id: "wsf-vessels/vesselsVerboseById",
  endpoint: "/ferries/api/vessels/rest/vesselverbose/{vesselId}",
  inputSchema: vesselsVerboseByIdInput,
  outputSchema: vesselVerboseSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "STATIC",
} as const;

// Type exports
export type VesselsVerboseByIdInput = z.infer<typeof vesselsVerboseByIdInput>;
