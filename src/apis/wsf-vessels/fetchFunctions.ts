import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsfVesselsApi } from "./apiDefinition";

export const {
  fetchCacheFlushDate,
  fetchVesselAccommodations,
  fetchVesselAccommodationsByVesselId,
  fetchVesselBasics,
  fetchVesselBasicsByVesselId,
  fetchVesselHistories,
  fetchVesselHistoriesByVesselNameAndDateRange,
  fetchVesselLocations,
  fetchVesselLocationsByVesselId,
  fetchVesselStats,
  fetchVesselStatsByVesselId,
  fetchVesselsVerbose,
  fetchVesselsVerboseByVesselId,
} = createFetchFunctions(wsfVesselsApi);
