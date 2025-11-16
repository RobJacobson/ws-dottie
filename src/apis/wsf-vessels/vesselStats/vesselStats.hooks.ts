import {
  fetchVesselStats,
  fetchVesselStatsByVesselId,
} from "./vesselStats.endpoints";

export const useVesselStats = fetchVesselStats.useQuery;
export const useVesselStatsByVesselId = fetchVesselStatsByVesselId.useQuery;
