/**
 * @fileoverview wsdot-highway-alerts API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./alertAreas/mapAreas";
export * from "./alertAreas/shared/alertAreas.input";
export * from "./alertAreas/shared/alertAreas.output";
export * from "./eventCategories/eventCategories";
export * from "./eventCategories/shared/eventCategories.input";
export * from "./highwayAlerts/alertById";
export * from "./highwayAlerts/alerts";
export * from "./highwayAlerts/alertsByMapArea";
export * from "./highwayAlerts/alertsByRegionId";
export * from "./highwayAlerts/searchAlerts";
export * from "./highwayAlerts/shared/highwayAlerts.input";
export * from "./highwayAlerts/shared/highwayAlerts.output";
