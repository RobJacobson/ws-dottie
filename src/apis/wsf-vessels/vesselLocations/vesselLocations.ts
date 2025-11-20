import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import { vesselLocationsGroup } from "./shared/vesselLocations.endpoints";
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
 * Fetch function for retrieving current locations and status for all active vessels
 */
export const fetchVesselLocations: FetchFactory<
  VesselLocationsInput,
  VesselLocation[]
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselLocationsMeta,
});

/**
 * React Query hook for retrieving current locations and status for all active vessels
 */
export const useVesselLocations: HookFactory<
  VesselLocationsInput,
  VesselLocation[]
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselLocationsMeta.functionName,
  fetchFn: fetchVesselLocations,
  cacheStrategy: vesselLocationsGroup.cacheStrategy,
});
