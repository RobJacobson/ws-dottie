import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselLocationsInput,
  vesselLocationsInputSchema,
} from "./shared/vesselLocations.input";
import {
  type VesselLocation,
  vesselLocationSchema,
} from "./shared/vesselLocations.output";

/**
 * Metadata for the fetchVesselLocations endpoint
 */
export const vesselLocationsMeta = {
  functionName: "fetchVesselLocations",
  endpoint: "/vesselLocations",
  inputSchema: vesselLocationsInputSchema,
  outputSchema: vesselLocationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current locations and status for all active vessels.",
} satisfies EndpointMeta<VesselLocationsInput, VesselLocation[]>;

/**
 * Factory result for vessel locations
 */
const vesselLocationsFactory = createFetchAndHook<
  VesselLocationsInput,
  VesselLocation[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselLocationsMeta,
  getEndpointGroup: () =>
    require("./shared/vesselLocations.endpoints").vesselLocationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving current locations and status for all active vessels
 */
export const { fetch: fetchVesselLocations, hook: useVesselLocations } =
  vesselLocationsFactory;
