/**
 * @fileoverview wsdot-highway-cameras API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./cameras/highwayCameraByCameraId";
export * from "./cameras/highwayCameras";
export * from "./cameras/searchHighwayCamerasByRouteAndMilepost";
export * from "./cameras/shared/cameras.input";
export * from "./cameras/shared/cameras.output";
