/**
 * @fileoverview WSDOT Mountain Pass Conditions API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Mountain Pass Conditions API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  GetMountainPassConditionInput,
  GetMountainPassConditionsInput,
} from "./passConditions/passConditions.input";
import type { PassCondition } from "./passConditions/passConditions.output";

// Create strongly-typed functions using the factory
export const getMountainPassConditionById = createApiFunction<
  GetMountainPassConditionInput,
  PassCondition
>("wsdot-mountain-pass-conditions:getMountainPassConditionById");
export const getMountainPassConditions = createApiFunction<
  GetMountainPassConditionsInput,
  PassCondition[]
>("wsdot-mountain-pass-conditions:getMountainPassConditions");
