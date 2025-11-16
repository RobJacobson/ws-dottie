import {
  fetchVesselHistories,
  fetchVesselHistoriesByVesselNameAndDateRange,
} from "./vesselHistories.endpoints";

export const useVesselHistories = fetchVesselHistories.useQuery;
export const useVesselHistoriesByVesselNameAndDateRange =
  fetchVesselHistoriesByVesselNameAndDateRange.useQuery;
