/**
 * @fileoverview WSDOT Highway Cameras API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Highway Cameras API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Highway Cameras hooks from the main hooks file
export {
  useGetHighwayCameraByCameraId,
  useGetHighwayCameras,
  useSearchHighwayCamerasByRouteAndMilepost,
} from "@/shared/tanstack/hooks";
