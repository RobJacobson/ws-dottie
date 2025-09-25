import { z } from "zod";

import {
  type VesselBasics,
  vesselBasicsSchema,
} from "@/schemas/wsf-vessels/vesselBasics.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

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
export const getVesselBasicsByIdMeta: EndpointDefinition<
  VesselBasicsByIdInput,
  VesselBasics
> = {
  id: "wsf-vessels:vesselBasicsById",
  endpoint: "/ferries/api/vessels/rest/vesselbasics/{vesselId}",
  inputSchema: vesselBasicsByIdInput,
  outputSchema: vesselBasicsSchema,
  sampleParams: { vesselId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdInput>;
