import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselLocationsGroup } from "./vesselLocations.endpoints";
import type {
  VesselLocationsByIdInput,
  VesselLocationsInput,
} from "./vesselLocations.input";
import type { VesselLocation } from "./vesselLocations.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  vesselLocationsGroup
);

export const fetchVesselLocations = fetchFunctions.fetchVesselLocations as (
  params?: FetchFunctionParams<VesselLocationsInput>
) => Promise<VesselLocation[]>;

export const fetchVesselLocationsByVesselId =
  fetchFunctions.fetchVesselLocationsByVesselId as (
    params?: FetchFunctionParams<VesselLocationsByIdInput>
  ) => Promise<VesselLocation>;
