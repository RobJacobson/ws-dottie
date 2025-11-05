/**
 * @fileoverview WSDOT Travel Times API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Travel Times API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  GetTravelTimeInput,
  GetTravelTimesInput,
} from "./travelTimeRoutes/travelTimeRoutes.input";
import type { TravelTimeRoute } from "./travelTimeRoutes/travelTimeRoutes.output";

// Create strongly-typed functions using the factory
export const getTravelTimeById = createApiFunction<
  GetTravelTimeInput,
  TravelTimeRoute
>("wsdot-travel-times:getTravelTimeById");
export const getTravelTimes = createApiFunction<
  GetTravelTimesInput,
  TravelTimeRoute[]
>("wsdot-travel-times:getTravelTimes");
