import {
  fetchAllSailingsBySchedRouteID,
  fetchSailingsByRouteID,
} from "./sailings.endpoints";

export const useAllSailingsBySchedRouteID =
  fetchAllSailingsBySchedRouteID.useQuery;

export const useSailingsByRouteID = fetchSailingsByRouteID.useQuery;
