import * as endpoints from "./highwayAlerts.endpoints";

export const fetchAlerts = endpoints.fetchAlerts.fetch;

export const fetchAlertById = endpoints.fetchAlertById.fetch;

export const fetchAlertsByRegionId = endpoints.fetchAlertsByRegionId.fetch;

export const fetchAlertsByMapArea = endpoints.fetchAlertsByMapArea.fetch;

export const searchAlerts = endpoints.searchAlerts.fetch;
