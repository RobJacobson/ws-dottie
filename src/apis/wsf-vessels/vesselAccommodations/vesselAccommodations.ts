import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import { vesselAccommodationsGroup } from "./shared/vesselAccommodations.endpoints";
import {
  type VesselAccommodationsInput,
  vesselAccommodationsInputSchema,
} from "./shared/vesselAccommodations.input";
import {
  type VesselAccommodation,
  vesselAccommodationSchema,
} from "./shared/vesselAccommodations.output";

/**
 * Metadata for the fetchVesselAccommodations endpoint
 */
export const vesselAccommodationsMeta = {
  functionName: "fetchVesselAccommodations",
  endpoint: "/vesselAccommodations",
  inputSchema: vesselAccommodationsInputSchema,
  outputSchema: vesselAccommodationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List amenities and accessibility features for all vessels.",
} satisfies EndpointMeta<VesselAccommodationsInput, VesselAccommodation[]>;

/**
 * Fetch function for retrieving amenities and accessibility features for all vessels
 */
export const fetchVesselAccommodations: FetchFactory<
  VesselAccommodationsInput,
  VesselAccommodation[]
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselAccommodationsMeta,
});

/**
 * React Query hook for retrieving amenities and accessibility features for all vessels
 */
export const useVesselAccommodations: HookFactory<
  VesselAccommodationsInput,
  VesselAccommodation[]
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselAccommodationsMeta.functionName,
  fetchFn: fetchVesselAccommodations,
  cacheStrategy: vesselAccommodationsGroup.cacheStrategy,
});
