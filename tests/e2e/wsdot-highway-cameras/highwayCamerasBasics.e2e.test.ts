/**
 * WSDOT Highway Cameras API - Basic Functionality Tests
 *
 * Tests basic API functionality and performance benchmarks.
 */

import { describe, it, expect } from "vitest";

import type { Camera } from "../../../src/api/wsdot-highway-cameras";
import {
  getActiveHighwayCameras,
  getHighwayCamera,
  getHighwayCameras,
  getHighwayCamerasByRegion,
  getHighwayCamerasByRoute,
  searchHighwayCameras,
} from "../../../src/api/wsdot-highway-cameras";
import { measureApiCall } from "../utils";

// Test data constants based on real API responses
const TEST_CAMERA_ID = 9987; // SR 9 at MP 15.4: Market Pl
const TEST_REGION = "NW";
const TEST_ROUTE = "9";

describe("WSDOT Highway Cameras API - Basic Functionality", () => {
  describe("getHighwayCameras", () => {
    it("should retrieve all highway cameras successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // Validate camera structure
      const firstCamera = data[0];
      expect(firstCamera).toHaveProperty("CameraID");
      expect(firstCamera).toHaveProperty("CameraLocation");
      expect(firstCamera).toHaveProperty("Title");
      expect(firstCamera).toHaveProperty("IsActive");
      expect(firstCamera).toHaveProperty("Region");
      expect(firstCamera).toHaveProperty("ImageURL");
    });

    it("should return cameras with valid structure", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        // Required properties
        expect(typeof camera.CameraID).toBe("number");
        expect(typeof camera.Title).toBe("string");
        expect(typeof camera.IsActive).toBe("boolean");
        expect(typeof camera.Region).toBe("string");
        expect(typeof camera.ImageURL).toBe("string");

        // CameraLocation structure
        expect(camera.CameraLocation).toBeDefined();
        expect(typeof camera.CameraLocation.Latitude).toBe("number");
        expect(typeof camera.CameraLocation.Longitude).toBe("number");
        expect(typeof camera.CameraLocation.MilePost).toBe("number");
        expect(typeof camera.CameraLocation.RoadName).toBe("string");

        // Image dimensions
        expect(typeof camera.ImageHeight).toBe("number");
        expect(typeof camera.ImageWidth).toBe("number");
        expect(camera.ImageHeight).toBeGreaterThan(0);
        expect(camera.ImageWidth).toBeGreaterThan(0);

        // Coordinates should be valid
        expect(camera.CameraLocation.Latitude).toBeGreaterThanOrEqual(45);
        expect(camera.CameraLocation.Latitude).toBeLessThanOrEqual(50);
        expect(camera.CameraLocation.Longitude).toBeGreaterThanOrEqual(-125);
        expect(camera.CameraLocation.Longitude).toBeLessThanOrEqual(-116);
      });
    });
  });

  describe("getHighwayCamera", () => {
    it("should retrieve a specific camera by ID successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCamera(TEST_CAMERA_ID)
      );

      expect(data).toBeDefined();
      expect(data.CameraID).toBe(TEST_CAMERA_ID);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // Validate camera data
      expect(data.Title).toBeDefined();
      expect(data.IsActive).toBeDefined();
      expect(data.Region).toBeDefined();
      expect(data.ImageURL).toBeDefined();
    });

    it("should return camera with complete structure", async () => {
      const camera = await getHighwayCamera(TEST_CAMERA_ID);

      // Required properties
      expect(camera.CameraID).toBe(TEST_CAMERA_ID);
      expect(typeof camera.Title).toBe("string");
      expect(typeof camera.IsActive).toBe("boolean");
      expect(typeof camera.Region).toBe("string");
      expect(typeof camera.ImageURL).toBe("string");

      // CameraLocation structure
      expect(camera.CameraLocation).toBeDefined();
      expect(typeof camera.CameraLocation.Latitude).toBe("number");
      expect(typeof camera.CameraLocation.Longitude).toBe("number");
      expect(typeof camera.CameraLocation.MilePost).toBe("number");
      expect(typeof camera.CameraLocation.RoadName).toBe("string");

      // Image dimensions
      expect(typeof camera.ImageHeight).toBe("number");
      expect(typeof camera.ImageWidth).toBe("number");
      expect(camera.ImageHeight).toBeGreaterThan(0);
      expect(camera.ImageWidth).toBeGreaterThan(0);
    });
  });

  describe("searchHighwayCameras", () => {
    it("should search cameras by region successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({ Region: TEST_REGION })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // All cameras should be in the specified region
      data.forEach((camera: Camera) => {
        expect(camera.Region).toBe(TEST_REGION);
      });
    });

    it("should search cameras by route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({ StateRoute: TEST_ROUTE })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // All cameras should be on the specified route
      data.forEach((camera: Camera) => {
        expect(camera.CameraLocation.RoadName).toContain(TEST_ROUTE);
      });
    });

    it("should search cameras with multiple parameters", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({
          Region: TEST_REGION,
          StateRoute: TEST_ROUTE,
        })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // All cameras should match both criteria
      data.forEach((camera: Camera) => {
        expect(camera.Region).toBe(TEST_REGION);
        expect(camera.CameraLocation.RoadName).toContain(TEST_ROUTE);
      });
    });

    it("should return empty array for no matches", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({ Region: "INVALID_REGION" })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0);
      expect(duration).toBeLessThan(2000); // 2-second LTE target
    });
  });

  describe("getActiveHighwayCameras", () => {
    it("should retrieve only active cameras", async () => {
      const { data, duration } = await measureApiCall(() =>
        getActiveHighwayCameras()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // All cameras should be active
      data.forEach((camera: Camera) => {
        expect(camera.IsActive).toBe(true);
      });
    });
  });

  describe("getHighwayCamerasByRegion", () => {
    it("should retrieve cameras for specific region", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCamerasByRegion(TEST_REGION)
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // All cameras should be in the specified region
      data.forEach((camera: Camera) => {
        expect(camera.Region).toBe(TEST_REGION);
      });
    });
  });

  describe("getHighwayCamerasByRoute", () => {
    it("should retrieve cameras for specific route", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCamerasByRoute(TEST_ROUTE)
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(duration).toBeLessThan(2000); // 2-second LTE target

      // All cameras should be on the specified route
      data.forEach((camera: Camera) => {
        expect(camera.CameraLocation.RoadName).toContain(TEST_ROUTE);
      });
    });
  });
});
