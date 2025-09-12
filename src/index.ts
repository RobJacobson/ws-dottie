/**
 * WS-Dottie - Washington State Transportation APIs
 *
 * A comprehensive TypeScript library for accessing Washington State Department of
 * Transportation (WSDOT) and Washington State Ferries (WSF) APIs with built-in
 * validation, caching, and type safety.
 *
 * This library provides:
 * - Type-safe API clients for all WSDOT and WSF endpoints
 * - Automatic data validation using Zod schemas
 * - Smart caching strategies optimized for transportation data
 * - React hooks for seamless integration
 * - CLI interface for command-line usage
 */

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Core shared functionality
export * from "./shared";

// ============================================================================
// WSDOT APIs
// ============================================================================

// Border Crossings
export * from "./clients/wsdot-border-crossings";

// Bridge Clearances
export * from "./clients/wsdot-bridge-clearances";

// Commercial Vehicle Restrictions
export * from "./clients/wsdot-commercial-vehicle-restrictions";

// Highway Alerts
export * from "./clients/wsdot-highway-alerts";

// Highway Cameras
export * from "./clients/wsdot-highway-cameras";

// Mountain Pass Conditions
export * from "./clients/wsdot-mountain-pass-conditions";

// Toll Rates
export * from "./clients/wsdot-toll-rates";

// Traffic Flow
export * from "./clients/wsdot-traffic-flow";

// Travel Times
export * from "./clients/wsdot-travel-times";

// Weather Information
export * from "./clients/wsdot-weather-information";

// Weather Information Extended
export * from "./clients/wsdot-weather-information-extended";

// Weather Stations
export * from "./clients/wsdot-weather-stations";

// ============================================================================
// WSF APIs
// ============================================================================

// Fares
export * from "./clients/wsf-fares";

// Schedule
export * from "./clients/wsf-schedule";

// Terminals
export * from "./clients/wsf-terminals";

// Vessels
export * from "./clients/wsf-vessels";

// ============================================================================
// CLI UTILITIES
// ============================================================================

// CLI endpoint discovery utilities
export {
  getAllEndpoints,
  getAvailableFunctions,
  findEndpoint,
} from "./cli/utils/endpoints";

// ============================================================================
// TYPES
// ============================================================================

// Common types
export * from "./types";
