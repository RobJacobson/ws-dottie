/**
 * @fileoverview WSDOT Bridge Clearances API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Bridge Clearances API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  BridgeClearancesByRouteInput,
  BridgeClearancesInput,
} from "./bridgeClearances/bridgeClearances.input";
import type { BridgeDataGIS } from "./bridgeClearances/bridgeClearances.output";

// Create strongly-typed functions using the factory
export const getBridgeClearances = createApiFunction<
  BridgeClearancesInput,
  BridgeDataGIS[]
>("wsdot-bridge-clearances:getBridgeClearances");
export const getBridgeClearancesByRoute = createApiFunction<
  BridgeClearancesByRouteInput,
  BridgeDataGIS[]
>("wsdot-bridge-clearances:getBridgeClearancesByRoute");
