/**
 * @fileoverview WSDOT Highway Alerts API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Highway Alerts API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { AlertAreasInput } from "./alertAreas/alertAreas.input";
import type { Area } from "./alertAreas/alertAreas.output";
import type { EventCategoriesInput } from "./eventCategories/eventCategories.input";
import type {
  HighwayAlertInput,
  HighwayAlertsByMapAreaInput,
  HighwayAlertsByRegionIDInput,
  HighwayAlertsInput,
  HighwayAlertsSearchInput,
} from "./highwayAlerts/highwayAlerts.input";
import type { Alert } from "./highwayAlerts/highwayAlerts.output";

// Create strongly-typed functions using the factory
export const getAlerts = createApiFunction<HighwayAlertsInput, Alert[]>(
  "wsdot-highway-alerts:getAlerts"
);
export const getAlertById = createApiFunction<HighwayAlertInput, Alert>(
  "wsdot-highway-alerts:getAlertById"
);
export const getAlertsByRegionId = createApiFunction<
  HighwayAlertsByRegionIDInput,
  Alert[]
>("wsdot-highway-alerts:getAlertsByRegionId");
export const getAlertsByMapArea = createApiFunction<
  HighwayAlertsByMapAreaInput,
  Alert[]
>("wsdot-highway-alerts:getAlertsByMapArea");
export const searchAlerts = createApiFunction<
  HighwayAlertsSearchInput,
  Alert[]
>("wsdot-highway-alerts:searchAlerts");
export const getMapAreas = createApiFunction<AlertAreasInput, Area[]>(
  "wsdot-highway-alerts:getMapAreas"
);
export const getEventCategories = createApiFunction<
  EventCategoriesInput,
  string[]
>("wsdot-highway-alerts:getEventCategories");
