/**
 * WSDOT Highway Cameras API - Basic E2E Tests
 *
 * Tests core functionality and performance of the Highway Cameras API.
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import { describe, it, expect } from "vitest";

import {
  getHighwayCamera,
  getHighwayCameras,
  searchHighwayCameras,
} from "../../../src/api/wsdot-highway-cameras";
import { measurePerformance } from "../../utils";

// Test data constants based on real API responses
const TEST_CAMERA_ID = 9987; // SR 9 at MP 15.4: Market Pl
const TEST_REGION = "NW";
const TEST_STATE_ROUTE = "9";

describe("WSDOT Highway Cameras API - Basic Functionality", () => {
  describe("getHighwayCameras", () => {
    it("should retrieve all highway cameras successfully", async () => {
      const { data, duration } = await measurePerformance(() =>
        getHighwayCameras()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // Validate first camera structure
      const firstCamera = data[0];
      expect(firstCamera).toHaveProperty("CameraID");
      expect(firstCamera).toHaveProperty("Title");
      expect(firstCamera).toHaveProperty("ImageURL");
      expect(firstCamera).toHaveProperty("IsActive");
      expect(firstCamera).toHaveProperty("Region");
      expect(firstCamera).toHaveProperty("CameraLocation");
      expect(firstCamera.CameraLocation).toHaveProperty("Latitude");
      expect(firstCamera.CameraLocation).toHaveProperty("Longitude");
      expect(firstCamera.CameraLocation).toHaveProperty("RoadName");
    });

    it("should return cameras with valid image URLs", async () => {
      const { data, duration } = await measurePerformance(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(2000);

      // Check that cameras have valid image URLs
      const camerasWithImages = data.filter((camera) =>
        camera.ImageURL?.startsWith("https://")
      );
      expect(camerasWithImages.length).toBeGreaterThan(0);

      // Validate image dimensions
      const cameraWithDimensions = data.find(
        (camera) => camera.ImageWidth > 0 && camera.ImageHeight > 0
      );
      expect(cameraWithDimensions).toBeDefined();
      expect(cameraWithDimensions?.ImageWidth).toBeGreaterThan(0);
      expect(cameraWithDimensions?.ImageHeight).toBeGreaterThan(0);
    });

    it("should return cameras with valid location data", async () => {
      const { data, duration } = await measurePerformance(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(2000);

      // Check that cameras have valid location data
      const camerasWithLocation = data.filter(
        (camera) =>
          camera.CameraLocation &&
          typeof camera.CameraLocation.Latitude === "number" &&
          typeof camera.CameraLocation.Longitude === "number" &&
          camera.CameraLocation.Latitude !== 0 &&
          camera.CameraLocation.Longitude !== 0
      );
      expect(camerasWithLocation.length).toBeGreaterThan(0);

      // Validate coordinate ranges for Washington State
      const validCamera = camerasWithLocation[0];
      expect(validCamera.CameraLocation.Latitude).toBeGreaterThan(45);
      expect(validCamera.CameraLocation.Latitude).toBeLessThan(50);
      expect(validCamera.CameraLocation.Longitude).toBeGreaterThan(-125);
      expect(validCamera.CameraLocation.Longitude).toBeLessThan(-116);
    });
  });

  describe("getHighwayCamera", () => {
    it("should retrieve a specific camera by ID successfully", async () => {
      const { data, duration } = await measurePerformance(() =>
        getHighwayCamera(TEST_CAMERA_ID)
      );

      expect(data).toBeDefined();
      expect(data.CameraID).toBe(TEST_CAMERA_ID);
      expect(data.Title).toBeDefined();
      expect(data.ImageURL).toBeDefined();
      expect(data.IsActive).toBeDefined();
      expect(duration).toBeLessThan(2000);
    });

    it("should return camera with complete location information", async () => {
      const { data, duration } = await measurePerformance(() =>
        getHighwayCamera(TEST_CAMERA_ID)
      );

      expect(duration).toBeLessThan(2000);
      expect(data.CameraLocation).toBeDefined();
      expect(data.CameraLocation.RoadName).toBeDefined();
      expect(data.CameraLocation.MilePost).toBeDefined();
      expect(data.CameraLocation.Latitude).toBeDefined();
      expect(data.CameraLocation.Longitude).toBeDefined();
      expect(typeof data.CameraLocation.Latitude).toBe("number");
      expect(typeof data.CameraLocation.Longitude).toBe("number");
    });

    it("should return camera with valid image information", async () => {
      const { data, duration } = await measurePerformance(() =>
        getHighwayCamera(TEST_CAMERA_ID)
      );

      expect(duration).toBeLessThan(2000);
      expect(data.ImageURL).toMatch(/^https:\/\/images\.wsdot\.wa\.gov\//);
      expect(data.ImageWidth).toBeGreaterThan(0);
      expect(data.ImageHeight).toBeGreaterThan(0);
      expect(data.DisplayLatitude).toBeDefined();
      expect(data.DisplayLongitude).toBeDefined();
    });
  });

  describe("searchHighwayCameras", () => {
    it("should search cameras by region successfully", async () => {
      const { data, duration } = await measurePerformance(() =>
        searchHighwayCameras({ Region: TEST_REGION })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(2000);

      // All cameras should be in the specified region
      data.forEach((camera) => {
        expect(camera.Region).toBe(TEST_REGION);
      });
    });

    it("should search cameras by state route successfully", async () => {
      const { data, duration } = await measurePerformance(() =>
        searchHighwayCameras({ StateRoute: TEST_STATE_ROUTE })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000);

      // All cameras should be on the specified route
      data.forEach((camera) => {
        expect(camera.CameraLocation.RoadName).toContain(TEST_STATE_ROUTE);
      });
    });

    it("should search cameras by milepost range successfully", async () => {
      const { data, duration } = await measurePerformance(() =>
        searchHighwayCameras({
          StartingMilepost: 10,
          EndingMilepost: 20,
        })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000);

      // All cameras should be within the milepost range
      data.forEach((camera) => {
        expect(camera.CameraLocation.MilePost).toBeGreaterThanOrEqual(10);
        expect(camera.CameraLocation.MilePost).toBeLessThanOrEqual(20);
      });
    });

    it("should handle empty search results gracefully", async () => {
      const { data, duration } = await measurePerformance(() =>
        searchHighwayCameras({ Region: "INVALID_REGION" })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0);
      expect(duration).toBeLessThan(2000);
    });
  });
});
