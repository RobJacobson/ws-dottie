/**
 * WSDOT Weather Information Extended API - File-per-Endpoint Structure
 *
 * This module provides access to Washington State Department of Transportation
 * extended weather information including surface and subsurface measurements.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getWeatherInformationExtended";

// ============================================================================
// NO TYPE RE-EXPORTS - CONSUMERS SHOULD IMPORT TYPES DIRECTLY FROM SOURCE
// ============================================================================

// Types are exported directly from getWeatherInformationExtended.ts
// Import them directly from the source file to avoid re-export chains
