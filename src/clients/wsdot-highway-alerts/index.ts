import { defineEndpoint } from "@/shared/endpoints";
import { getAlertMeta } from "./getAlert";
import { getAlertsMeta } from "./getAlerts";
import { getAlertsByRegionIdMeta } from "./getAlertsByRegionId";
import { getAlertsForMapAreaMeta } from "./getAlertsForMapArea";
import { getEventCategoriesMeta } from "./getEventCategories";
import { getMapAreasMeta } from "./getMapAreas";
import { searchAlertsMeta } from "./searchAlerts";

export const getAlert = defineEndpoint(getAlertMeta);
export const getAlerts = defineEndpoint(getAlertsMeta);
export const getAlertsByRegionId = defineEndpoint(getAlertsByRegionIdMeta);
export const getAlertsForMapArea = defineEndpoint(getAlertsForMapAreaMeta);
export const getEventCategories = defineEndpoint(getEventCategoriesMeta);
export const getMapAreas = defineEndpoint(getMapAreasMeta);
export const searchAlerts = defineEndpoint(searchAlertsMeta);

// Re-export output types from schemas
export type {
  Alert,
  Alerts,
  EventCategories,
  MapArea,
  MapAreas,
} from "@/schemas/wsdot-highway-alerts";
// Re-export input types from client files
export type { AlertInput } from "./getAlert";
export type { AlertsInput } from "./getAlerts";
export type { AlertsByRegionIdInput } from "./getAlertsByRegionId";
export type { AlertsForMapAreaInput } from "./getAlertsForMapArea";
export type { EventCategoriesInput } from "./getEventCategories";
export type { MapAreasInput } from "./getMapAreas";
export type { SearchAlertsInput } from "./searchAlerts";
