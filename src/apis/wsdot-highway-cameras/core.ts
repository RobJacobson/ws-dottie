/**
 * @fileoverview WSDOT Highway Cameras API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Highway Cameras API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  CameraInput,
  CamerasInput,
  CamerasSearchInput,
} from "./cameras/cameras.input";
import type { Camera } from "./cameras/cameras.output";

// Create strongly-typed functions using the factory
export const getHighwayCameras = createApiFunction<CamerasInput, Camera[]>(
  "wsdot-highway-cameras:getHighwayCameras"
);
export const searchHighwayCamerasByRouteAndMilepost = createApiFunction<
  CamerasSearchInput,
  Camera[]
>("wsdot-highway-cameras:searchHighwayCamerasByRouteAndMilepost");
export const getHighwayCameraByCameraId = createApiFunction<
  CameraInput,
  Camera
>("wsdot-highway-cameras:getHighwayCameraByCameraId");
