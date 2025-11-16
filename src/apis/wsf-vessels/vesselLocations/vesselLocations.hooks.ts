import {
  fetchVesselLocations,
  fetchVesselLocationsByVesselId,
} from "./vesselLocations.endpoints";

export const useVesselLocations = fetchVesselLocations.useQuery;
export const useVesselLocationsByVesselId =
  fetchVesselLocationsByVesselId.useQuery;
