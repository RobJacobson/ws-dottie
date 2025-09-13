import { z } from "zod";
import {
  vesselsVerboseSchema,
  type VesselsVerbose,
} from "@/schemas/wsf-vessels/vesselVerbose.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getVesselVerbose */
const vesselsVerboseInput = z.object({});

/** Endpoint metadata for getVesselVerbose */
export const getVesselVerboseMeta: Endpoint<
  VesselsVerboseInput,
  VesselsVerbose
> = {
  api: "wsf-vessels",
  function: "getVesselVerbose",
  endpoint: "/ferries/api/vessels/rest/vesselverbose",
  inputSchema: vesselsVerboseInput,
  outputSchema: vesselsVerboseSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type VesselsVerboseInput = z.infer<typeof vesselsVerboseInput>;
