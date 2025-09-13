import { z } from "zod";
import { vesselHistorysSchema } from "@/schemas/wsf-vessels";

/** Input schema for getVesselHistory */
const vesselHistoryInput = z.object({});

/** Endpoint metadata for getVesselHistory */
export const getVesselHistoryMeta = {
  api: "wsf-vessels",
  function: "getVesselHistory",
  endpoint: "/ferries/api/vessels/rest/vesselhistory",
  inputSchema: vesselHistoryInput,
  outputSchema: vesselHistorysSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type VesselHistoryInput = z.infer<typeof vesselHistoryInput>;
