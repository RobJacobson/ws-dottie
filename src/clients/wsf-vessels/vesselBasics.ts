import { z } from "zod";
import type { VesselBasics } from "@/schemas/wsf-vessels/vesselBasics.zod";
import { vesselBasicsSchema } from "@/schemas/wsf-vessels/vesselBasics.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselBasics */
const vesselBasicsInput = z.object({});

/** Endpoint metadata for getVesselBasics */
export const getVesselBasicsMeta: EndpointDefinition<
  VesselBasicsInput,
  VesselBasics[]
> = {
  id: "wsf-vessels/vesselBasics",
  endpoint: "/ferries/api/vessels/rest/vesselbasics",
  inputSchema: vesselBasicsInput,
  outputSchema: z.array(vesselBasicsSchema),
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type VesselBasicsInput = z.infer<typeof vesselBasicsInput>;
