/**
 * @fileoverview wsdot-traffic-flow API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./flowData/shared/flowData.input";
export * from "./flowData/shared/flowData.output";
// Flow Data
export { fetchTrafficFlowById } from "./flowData/trafficFlowById";
export { fetchTrafficFlows } from "./flowData/trafficFlows";
