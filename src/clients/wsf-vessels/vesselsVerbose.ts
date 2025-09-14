import { z } from "zod";
import {
  type VesselsVerbose,
  vesselsVerboseSchema,
} from "@/schemas/wsf-vessels/vesselVerbose.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getVesselVerbose */
const vesselsVerboseInput = z.object({});

/** Endpoint metadata for getVesselVerbose */
export const getVesselVerboseMeta: EndpointMeta<
  VesselsVerboseInput,
  VesselsVerbose
> = {
  id: "wsf-vessels/vesselsVerbose",
  endpoint: "/ferries/api/vessels/rest/vesselverbose",
  inputSchema: vesselsVerboseInput,
  outputSchema: vesselsVerboseSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type VesselsVerboseInput = z.infer<typeof vesselsVerboseInput>;
