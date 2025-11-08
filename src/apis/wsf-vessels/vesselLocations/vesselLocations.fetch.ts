import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import { vesselLocationsGroup } from "./vesselLocations.endpoints";
import type {
  VesselLocationsByIdInput,
  VesselLocationsInput,
} from "./vesselLocations.input";
import type { VesselLocation } from "./vesselLocations.output";

const fetchFunctions = createFetchFunctions(
  wsfVesselsApi,
  vesselLocationsGroup
);

export const fetchVesselLocations: (
  params?: FetchFunctionParams<VesselLocationsInput>
) => Promise<VesselLocation[]> = fetchFunctions.fetchVesselLocations;

export const fetchVesselLocationsByVesselId: (
  params?: FetchFunctionParams<VesselLocationsByIdInput>
) => Promise<VesselLocation> = fetchFunctions.fetchVesselLocationsByVesselId;
