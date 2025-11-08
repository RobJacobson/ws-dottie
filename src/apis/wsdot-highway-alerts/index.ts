/**
 * @fileoverview wsdot-highway-alerts API - Exports hooks, fetch functions, and types
 *
 * This module provides exports for all hooks, fetch functions, and types in the wsdot-highway-alerts API.
 */

// Export hooks
export * from "./alertAreas/alertAreas.hooks";
// Re-export everything from core (fetch functions and types)
export * from "./core";
export * from "./eventCategories/eventCategories.hooks";
export * from "./highwayAlerts/highwayAlerts.hooks";
