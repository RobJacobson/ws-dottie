import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselBasicsByIdInput,
  vesselBasicsByIdInputSchema,
} from "./shared/vesselBasics.input";
import {
  type VesselBasic,
  vesselBasicSchema,
} from "./shared/vesselBasics.output";

/**
 * Metadata for the fetchVesselBasicsByVesselId endpoint
 */
export const vesselBasicsByVesselIdMeta = {
  functionName: "fetchVesselBasicsByVesselId",
  endpoint: "/vesselBasics/{VesselID}",
  inputSchema: vesselBasicsByIdInputSchema,
  outputSchema: vesselBasicSchema,
  sampleParams: { VesselID: 74 },
  endpointDescription: "Get basic information for a specific vessel by ID.",
} satisfies EndpointMeta<VesselBasicsByIdInput, VesselBasic>;

/**
 * Factory result for vessel basics by vessel ID
 */
const vesselBasicsByVesselIdFactory = createFetchAndHook<
  VesselBasicsByIdInput,
  VesselBasic
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselBasicsByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselBasics.endpoints").vesselBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for a specific vessel by ID
 */
export const {
  fetch: fetchVesselBasicsByVesselId,
  hook: useVesselBasicsByVesselId,
} = vesselBasicsByVesselIdFactory;
