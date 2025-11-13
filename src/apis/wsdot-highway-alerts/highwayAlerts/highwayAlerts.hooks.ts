import {
  fetchAlertById,
  fetchAlerts,
  fetchAlertsByMapArea,
  fetchAlertsByRegionId,
  searchAlerts,
} from "./highwayAlerts.endpoints";

export const useAlerts = fetchAlerts.useQuery;

export const useAlertById = fetchAlertById.useQuery;

export const useAlertsByRegionId = fetchAlertsByRegionId.useQuery;

export const useAlertsByMapArea = fetchAlertsByMapArea.useQuery;

export const useSearchAlerts = searchAlerts.useQuery;
