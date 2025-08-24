import { expect } from "vitest";
import { z } from "zod";

import {
  cameraArraySchema,
  cameraSchema,
  getHighwayCamera,
  getHighwayCameraParamsSchema,
  getHighwayCameras,
  searchHighwayCameras,
  searchHighwayCamerasParamsSchema,
} from "../../../src/api/wsdot-highway-cameras";
import { wsdotTestData } from "../utils/test-data";
import type { ApiModuleConfig } from "../utils/types";

/**
 * Test configuration for WSDOT Highway Cameras API
 *
 * This configuration defines all the test requirements for the highway cameras endpoints.
 * The test generators will use this configuration to create comprehensive test suites.
 */
export const highwayCamerasTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Highway Cameras",

  settings: {
    defaultMaxResponseTime: 5000, // 5 seconds for camera endpoints
    requiresAuth: false,
    rateLimitDelay: 200, // 200ms between requests to avoid overwhelming the API
  },

  sharedTestData: {
    validCameraIds: [9818, 9819, 9820, 9821, 8216], // Real camera IDs from the API
    invalidCameraIds: wsdotTestData.highwayCameras.invalidCameraIds,
    validRegions: wsdotTestData.highwayCameras.validRegions,
  },

  endpoints: [
    // Parameterless endpoint - get all cameras
    {
      apiFunction: getHighwayCameras,
      outputSchema: cameraArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint has no invalid params
      endpointName: "getHighwayCameras",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return cameras with valid image URLs",
          test: async () => {
            const cameras = await getHighwayCameras({});
            const validated = cameraArraySchema.parse(cameras);

            // Check that cameras have valid image URLs
            for (const camera of validated) {
              expect(camera.ImageURL).toBeDefined();
              expect(typeof camera.ImageURL).toBe("string");
              expect(camera.ImageURL.length).toBeGreaterThan(0);
            }
          },
        },
        {
          name: "should return cameras with valid location data",
          test: async () => {
            const cameras = await getHighwayCameras({});
            const validated = cameraArraySchema.parse(cameras);

            // Check that cameras have valid location data
            for (const camera of validated) {
              expect(camera.DisplayLatitude).toBeDefined();
              expect(camera.DisplayLongitude).toBeDefined();
              expect(typeof camera.DisplayLatitude).toBe("number");
              expect(typeof camera.DisplayLongitude).toBe("number");

              // Check reasonable latitude/longitude ranges for Washington State
              expect(camera.DisplayLatitude).toBeGreaterThan(45); // Southern border
              expect(camera.DisplayLatitude).toBeLessThan(50); // Northern border
              expect(camera.DisplayLongitude).toBeGreaterThan(-125); // Western border
              expect(camera.DisplayLongitude).toBeLessThan(-116); // Eastern border
            }
          },
        },
      ],
    },

    // ID-based endpoint - get single camera
    {
      apiFunction: getHighwayCamera,
      inputSchema: getHighwayCameraParamsSchema,
      outputSchema: cameraSchema,
      validParams: { cameraID: 9818 }, // Use real camera ID from the API
      invalidParams: [
        { params: { cameraID: -1 }, expectedError: "Invalid camera ID" },
        { params: { cameraID: 0 }, expectedError: "Invalid camera ID" },
        { params: { cameraID: 999999 }, expectedError: "Camera not found" },
        {
          params: { cameraID: "invalid" as any },
          expectedError: "Invalid parameter type",
        },
        {
          params: { cameraID: null as any },
          expectedError: "Invalid parameter type",
        },
      ],
      endpointName: "getHighwayCamera",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return camera with matching ID",
          test: async () => {
            const cameraID = 9818; // Use real camera ID
            const camera = await getHighwayCamera({ cameraID });
            const validated = cameraSchema.parse(camera);

            expect(validated.CameraID).toBe(cameraID);
          },
        },
        {
          name: "should return camera with complete location data",
          test: async () => {
            const cameraID = 9818; // Use real camera ID
            const camera = await getHighwayCamera({ cameraID });
            const validated = cameraSchema.parse(camera);

            expect(validated.CameraLocation).toBeDefined();
            expect(validated.CameraLocation.RoadName).toBeDefined();
            expect(validated.CameraLocation.Latitude).toBeDefined();
            expect(validated.CameraLocation.Longitude).toBeDefined();
            expect(validated.CameraLocation.MilePost).toBeDefined();
          },
        },
      ],
    },

    // Search endpoint - search cameras
    {
      apiFunction: searchHighwayCameras,
      inputSchema: searchHighwayCamerasParamsSchema,
      outputSchema: cameraArraySchema,
      validParams: { StateRoute: "5" },
      invalidParams: [
        // Search APIs typically don't throw errors for invalid params, they return empty results
        // So we don't test for error throwing behavior here
      ],
      endpointName: "searchHighwayCameras",
      category: "search",
      maxResponseTime: 4000,
      customTests: [
        {
          name: "should return cameras matching state route",
          test: async () => {
            const cameras = await searchHighwayCameras({ StateRoute: "5" });
            const validated = cameraArraySchema.parse(cameras);

            // Check that returned cameras are on I-5
            for (const camera of validated) {
              const title = camera.Title?.toLowerCase() || "";
              const description = (camera.Description || "").toLowerCase();

              expect(title.includes("i-5") || description.includes("i-5")).toBe(
                true
              );
            }
          },
        },
        {
          name: "should handle region search",
          test: async () => {
            const cameras = await searchHighwayCameras({ Region: "NW" });
            const validated = cameraArraySchema.parse(cameras);

            // Should find cameras in Northwest region
            expect(validated.length).toBeGreaterThan(0);
          },
        },
      ],
    },
  ],
};
