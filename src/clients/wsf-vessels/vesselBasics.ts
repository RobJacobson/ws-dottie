import { z } from "zod";
import type { VesselBasics } from "@/schemas/wsf-vessels/vesselBasics.zod";
import { vesselBasicsSchema } from "@/schemas/wsf-vessels/vesselBasics.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselBasics */
const vesselBasicsInput = z.object({});

/** Endpoint metadata for getVesselBasics */
export const getVesselBasicsMeta: Endpoint<VesselBasicsInput, VesselBasics[]> =
  {
    api: "wsf-vessels",
    function: "getVesselBasics",
    endpoint: "/ferries/api/vessels/rest/vesselbasics",
    inputSchema: vesselBasicsInput,
    outputSchema: z.array(vesselBasicsSchema),
    sampleParams: {},
    cacheStrategy: "DAILY_STATIC",
  };

// Type exports
export type VesselBasicsInput = z.infer<typeof vesselBasicsInput>;
