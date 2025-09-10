// Re-export client functions only
// For schema types, import directly from "@/schemas/wsdot-highway-alerts"
export * from "./getAlert";
export * from "./getAlerts";
export * from "./getAlertsByRegionId";
export * from "./getAlertsForMapArea";
export * from "./getEventCategories";
export * from "./getMapAreas";
export * from "./searchAlerts";

// Re-export output types from schemas
export type {
  Alert,
  Alerts,
  EventCategories,
  MapArea,
  MapAreas,
} from "@/schemas/wsdot-highway-alerts";
