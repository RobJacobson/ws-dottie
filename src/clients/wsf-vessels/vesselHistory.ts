import { z } from "zod";
import type { VesselHistory } from "@/schemas/wsf-vessels/vesselHistory.zod";
import { vesselHistorySchema } from "@/schemas/wsf-vessels/vesselHistory.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselHistory */
const vesselHistoryInput = z.object({});

/** Endpoint metadata for getVesselHistory */
export const getVesselHistoryMeta: Endpoint<
  VesselHistoryInput,
  VesselHistory[]
> = {
  api: "wsf-vessels",
  function: "getVesselHistory",
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: vesselHistoryInput,
  outputSchema: z.array(vesselHistorySchema),
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type VesselHistoryInput = z.infer<typeof vesselHistoryInput>;
