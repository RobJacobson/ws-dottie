/**
 * @fileoverview WSF Schedule API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Schedule API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsfScheduleApi } from "./endpoints";

// Note: Input types are defined inline in endpoints.ts since they use inline schemas
// They can be accessed by importing the endpoint definitions directly

// Export all output types
export type {
  CacheFlushDate,
  RouteDetail,
  RouteList,
  SailingList,
  ScheduleList,
} from "./original/outputSchemas.original";
