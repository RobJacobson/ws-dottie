/**
 * @fileoverview WSDOT Commercial Vehicle Restrictions API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Commercial Vehicle Restrictions API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { GetCommercialVehicleRestrictionsInput } from "./cvRestrictionData/cvRestrictionData.input";
import type { CVRestrictionData } from "./cvRestrictionData/cvRestrictionData.output";
import type { GetCommercialVehicleRestrictionsWithIdInput } from "./cvRestrictionDataWithId/cvRestrictionDataWithId.input";
import type { CVRestrictionDataWithId } from "./cvRestrictionDataWithId/cvRestrictionDataWithId.output";

// Create strongly-typed functions using the factory
export const getCommercialVehicleRestrictions = createApiFunction<
  GetCommercialVehicleRestrictionsInput,
  CVRestrictionData[]
>("wsdot-commercial-vehicle-restrictions:getCommercialVehicleRestrictions");
export const getCommercialVehicleRestrictionsWithId = createApiFunction<
  GetCommercialVehicleRestrictionsWithIdInput,
  CVRestrictionDataWithId[]
>(
  "wsdot-commercial-vehicle-restrictions:getCommercialVehicleRestrictionsWithId"
);
