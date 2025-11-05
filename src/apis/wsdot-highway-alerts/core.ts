/**
 * @fileoverview WSDOT Highway Alerts API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Highway Alerts API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { GetMapAreasInput } from "./alertAreas/alertAreas.input";
import type { Area } from "./alertAreas/alertAreas.output";
import type { GetEventCategoriesInput } from "./eventCategories/eventCategories.input";
import type {
  GetAlertInput,
  GetAlertsByRegionIDInput,
  GetAlertsForMapAreaInput,
  GetAlertsInput,
  SearchAlertsInput,
} from "./highwayAlerts/highwayAlerts.input";
import type { Alert } from "./highwayAlerts/highwayAlerts.output";

// Create strongly-typed functions using the factory
export const getAlerts = createApiFunction<GetAlertsInput, Alert[]>(
  "wsdot-highway-alerts:getAlerts"
);
export const getAlertById = createApiFunction<GetAlertInput, Alert>(
  "wsdot-highway-alerts:getAlertById"
);
export const getAlertsByRegionId = createApiFunction<
  GetAlertsByRegionIDInput,
  Alert[]
>("wsdot-highway-alerts:getAlertsByRegionId");
export const getAlertsByMapArea = createApiFunction<
  GetAlertsForMapAreaInput,
  Alert[]
>("wsdot-highway-alerts:getAlertsByMapArea");
export const searchAlerts = createApiFunction<SearchAlertsInput, Alert[]>(
  "wsdot-highway-alerts:searchAlerts"
);
export const getMapAreas = createApiFunction<GetMapAreasInput, Area[]>(
  "wsdot-highway-alerts:getMapAreas"
);
export const getEventCategories = createApiFunction<
  GetEventCategoriesInput,
  string[]
>("wsdot-highway-alerts:getEventCategories");
