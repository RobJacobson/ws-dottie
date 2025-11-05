/**
 * @fileoverview WSDOT Traffic Flow API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Traffic Flow API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  GetTrafficFlowInput,
  GetTrafficFlowsInput,
} from "./flowData/flowData.input";
import type { FlowData } from "./flowData/flowData.output";

// Create strongly-typed functions using the factory
export const getTrafficFlows = createApiFunction<
  GetTrafficFlowsInput,
  FlowData[]
>("wsdot-traffic-flow:getTrafficFlows");
export const getTrafficFlowById = createApiFunction<
  GetTrafficFlowInput,
  FlowData
>("wsdot-traffic-flow:getTrafficFlowById");
