import {
  fetchVesselsVerbose,
  fetchVesselsVerboseByVesselId,
} from "./vesselVerbose.endpoints";

export const useVesselsVerbose = fetchVesselsVerbose.useQuery;
export const useVesselsVerboseByVesselId =
  fetchVesselsVerboseByVesselId.useQuery;
