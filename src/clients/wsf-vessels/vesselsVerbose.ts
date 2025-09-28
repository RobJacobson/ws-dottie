import { z } from "zod";

import {
  type VesselsVerbose,
  vesselsVerboseSchema,
} from "@/schemas/wsf-vessels/vesselVerbose.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getVesselVerbose */
const vesselsVerboseInput = z.object({}).strict();

/** Endpoint metadata for getVesselVerbose */
export const getVesselVerboseMeta: EndpointDefinition<
  VesselsVerboseInput,
  VesselsVerbose
> = {
  api: "wsf-vessels",
  function: "vesselsVerbose",
  endpoint: "/ferries/api/vessels/rest/vesselverbose",
  inputSchema: vesselsVerboseInput,
  outputSchema: vesselsVerboseSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
} as const;

// Type exports
export type VesselsVerboseInput = z.infer<typeof vesselsVerboseInput>;
