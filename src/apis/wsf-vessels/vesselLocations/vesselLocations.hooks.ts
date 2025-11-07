import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselLocationsGroup } from "./vesselLocations.endpoints";
import * as fetchFunctions from "./vesselLocations.fetch";
import type {
  VesselLocationsByIdInput,
  VesselLocationsInput,
} from "./vesselLocations.input";
import type { VesselLocation } from "./vesselLocations.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  vesselLocationsGroup,
  fetchFunctions
);

export const useVesselLocations: (
  params?: VesselLocationsInput,
  options?: QueryHookOptions<VesselLocation[]>
) => UseQueryResult<VesselLocation[], Error> = hooks.useVesselLocations;

export const useVesselLocationsByVesselId: (
  params?: VesselLocationsByIdInput,
  options?: QueryHookOptions<VesselLocation>
) => UseQueryResult<VesselLocation, Error> = hooks.useVesselLocationsByVesselId;
