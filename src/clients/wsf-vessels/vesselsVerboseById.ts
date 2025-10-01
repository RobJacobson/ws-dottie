import { z } from "zod";

import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "@/schemas/wsf-vessels/vesselVerbose.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselVerboseById */
const vesselsVerboseByIdInput = z.object({
  VesselID: z
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
  api: "wsf-vessels",
  function: "vesselsVerboseById",
  endpoint: "/ferries/api/vessels/rest/vesselverbose/{VesselID}",
  inputSchema: vesselsVerboseByIdInput,
  outputSchema: vesselVerboseSchema,
  sampleParams: { VesselID: 68 },
  cacheStrategy: "STATIC",
} as const;

// Type exports
export type VesselsVerboseByIdInput = z.infer<typeof vesselsVerboseByIdInput>;
