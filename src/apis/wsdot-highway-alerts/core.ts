/**
 * @fileoverview wsdot-highway-alerts API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./alertAreas/alertAreas.fetch";
export * from "./alertAreas/alertAreas.input";
export * from "./alertAreas/alertAreas.output";
export * from "./eventCategories/eventCategories.fetch";
export * from "./eventCategories/eventCategories.input";
export * from "./highwayAlerts/highwayAlerts.fetch";
export * from "./highwayAlerts/highwayAlerts.input";
export * from "./highwayAlerts/highwayAlerts.output";
