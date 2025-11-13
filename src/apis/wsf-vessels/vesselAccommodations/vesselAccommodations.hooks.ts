import {
  fetchVesselAccommodations,
  fetchVesselAccommodationsByVesselId,
} from "./vesselAccommodations.endpoints";

export const useVesselAccommodations =
  fetchVesselAccommodations.useQuery;
export const useVesselAccommodationsByVesselId =
  fetchVesselAccommodationsByVesselId.useQuery;
