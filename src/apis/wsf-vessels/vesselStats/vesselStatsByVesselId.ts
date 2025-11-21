import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselStatsByIdInput,
  vesselStatsByIdInputSchema,
} from "./shared/vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./shared/vesselStats.output";

/**
 * Metadata for the fetchVesselStatsByVesselId endpoint
 */
export const vesselStatsByVesselIdMeta = {
  functionName: "fetchVesselStatsByVesselId",
  endpoint: "/vesselStats/{VesselID}",
  inputSchema: vesselStatsByIdInputSchema,
  outputSchema: vesselStatSchema,
  sampleParams: { VesselID: 32 },
  endpointDescription:
    "Get technical specifications for a specific vessel by ID.",
} satisfies EndpointMeta<VesselStatsByIdInput, VesselStat>;

/**
 * Factory result for vessel stats by vessel ID
 */
const vesselStatsByVesselIdFactory = createFetchAndHook<
  VesselStatsByIdInput,
  VesselStat
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselStatsByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselStats.endpoints").vesselStatsGroup,
});

/**
 * Fetch function and React Query hook for retrieving technical specifications for a specific vessel by ID
 */
export const {
  fetch: fetchVesselStatsByVesselId,
  hook: useVesselStatsByVesselId,
} = vesselStatsByVesselIdFactory;
