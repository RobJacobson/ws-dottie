import {
  fetchVesselBasics,
  fetchVesselBasicsByVesselId,
} from "./vesselBasics.endpoints";

export const useVesselBasics = fetchVesselBasics.useQuery;
export const useVesselBasicsByVesselId = fetchVesselBasicsByVesselId.useQuery;
