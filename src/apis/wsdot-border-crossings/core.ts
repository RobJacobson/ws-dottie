/**
 * @fileoverview WSDOT Border Crossings API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Border Crossings API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { BorderCrossingDataInput } from "./borderCrossingData/borderCrossingData.input";
import type { BorderCrossingData } from "./borderCrossingData/borderCrossingData.output";

// Create strongly-typed functions using the factory
export const getBorderCrossings = createApiFunction<
  BorderCrossingDataInput,
  BorderCrossingData[]
>("wsdot-border-crossings:getBorderCrossings");
