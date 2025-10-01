import { z } from "zod";

import {
  type VesselBasics,
  vesselBasicsSchema,
} from "@/schemas/wsf-vessels/vesselBasics.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselBasicsById */
const vesselBasicsByIdInput = z.object({
  VesselID: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

/** Endpoint metadata for getVesselBasicsById */
export const getVesselBasicsByIdMeta: EndpointDefinition<
  VesselBasicsByIdInput,
  VesselBasics
> = {
  api: "wsf-vessels",
  function: "vesselBasicsById",
  endpoint: "/ferries/api/vessels/rest/vesselbasics/{VesselID}",
  inputSchema: vesselBasicsByIdInput,
  outputSchema: vesselBasicsSchema,
  sampleParams: { VesselID: 15 },
  cacheStrategy: "STATIC",
};

// Type exports
export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdInput>;
