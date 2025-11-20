/**
 * @fileoverview wsdot-mountain-pass-conditions API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

// Pass Conditions
export { fetchMountainPassConditionById } from "./passConditions/mountainPassConditionById";
export { fetchMountainPassConditions } from "./passConditions/mountainPassConditions";
export * from "./passConditions/shared/passConditions.input";
export * from "./passConditions/shared/passConditions.output";
