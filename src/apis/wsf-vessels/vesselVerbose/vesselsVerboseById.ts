import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselVerboseByIdInput,
  vesselVerboseByIdInputSchema,
} from "./shared/vesselVerbose.input";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "./shared/vesselVerbose.output";

/**
 * Metadata for the fetchVesselsVerboseByVesselId endpoint
 */
export const vesselsVerboseByVesselIdMeta = {
  functionName: "fetchVesselsVerboseByVesselId",
  endpoint: "/vesselVerbose/{VesselID}",
  inputSchema: vesselVerboseByIdInputSchema,
  outputSchema: vesselVerboseSchema,
  sampleParams: { VesselID: 68 },
  endpointDescription:
    "Get complete vessel information for a specific vessel by ID.",
} satisfies EndpointMeta<VesselVerboseByIdInput, VesselVerbose>;

/**
 * Factory result for vessels verbose by vessel ID
 */
const vesselsVerboseByVesselIdFactory = createFetchAndHook<
  VesselVerboseByIdInput,
  VesselVerbose
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselsVerboseByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselVerbose.endpoints").vesselVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving complete vessel information for a specific vessel by ID
 */
export const {
  fetch: fetchVesselsVerboseByVesselId,
  hook: useVesselsVerboseByVesselId,
} = vesselsVerboseByVesselIdFactory;
