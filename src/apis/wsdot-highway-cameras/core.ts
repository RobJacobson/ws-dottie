/**
 * @fileoverview WSDOT Highway Cameras API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Highway Cameras API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  GetCameraInput,
  GetCamerasInput,
  SearchCamerasInput,
} from "./cameras/cameras.input";
import type { Camera } from "./cameras/cameras.output";

// Create strongly-typed functions using the factory
export const getHighwayCameras = createApiFunction<GetCamerasInput, Camera[]>(
  "wsdot-highway-cameras:getHighwayCameras"
);
export const searchHighwayCamerasByRouteAndMilepost = createApiFunction<
  SearchCamerasInput,
  Camera[]
>("wsdot-highway-cameras:searchHighwayCamerasByRouteAndMilepost");
export const getHighwayCameraByCameraId = createApiFunction<
  GetCameraInput,
  Camera
>("wsdot-highway-cameras:getHighwayCameraByCameraId");
