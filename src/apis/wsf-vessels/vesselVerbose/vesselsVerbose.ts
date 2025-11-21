import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselVerboseInput,
  vesselVerboseInputSchema,
} from "./shared/vesselVerbose.input";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "./shared/vesselVerbose.output";

/**
 * Metadata for the fetchVesselsVerbose endpoint
 */
export const vesselsVerboseMeta = {
  functionName: "fetchVesselsVerbose",
  endpoint: "/vesselVerbose",
  inputSchema: vesselVerboseInputSchema,
  outputSchema: vesselVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List complete vessel information for all vessels.",
} satisfies EndpointMeta<VesselVerboseInput, VesselVerbose[]>;

/**
 * Factory result for vessels verbose
 */
const vesselsVerboseFactory = createFetchAndHook<
  VesselVerboseInput,
  VesselVerbose[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselsVerboseMeta,
  getEndpointGroup: () =>
    require("./shared/vesselVerbose.endpoints").vesselVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving complete vessel information for all vessels
 */
export const { fetch: fetchVesselsVerbose, hook: useVesselsVerbose } =
  vesselsVerboseFactory;
