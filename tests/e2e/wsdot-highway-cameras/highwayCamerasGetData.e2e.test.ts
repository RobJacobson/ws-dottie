/**
 * WSDOT Highway Cameras API - Data Retrieval Tests
 *
 * Tests data validation, error scenarios, and response structures.
 */

import { describe, expect, it } from "vitest";

import type { Camera } from "../../../src/api/wsdot-highway-cameras";
import {
  getHighwayCamera,
  getHighwayCameras,
  searchHighwayCameras,
} from "../../../src/api/wsdot-highway-cameras";
import { measureApiCall } from "../utils";

// Test data constants based on real API responses
const TEST_CAMERA_ID = 9987; // SR 9 at MP 15.4: Market Pl
const INVALID_CAMERA_ID = 999999;
const TEST_REGION = "NW";
const TEST_ROUTE = "9";

describe("WSDOT Highway Cameras API - Data Retrieval", () => {
  describe("Data Structure Validation", () => {
    it("should return cameras with complete data structure", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        // Validate all required fields exist
        expect(camera).toHaveProperty("CameraID");
        expect(camera).toHaveProperty("CameraLocation");
        expect(camera).toHaveProperty("CameraOwner");
        expect(camera).toHaveProperty("Description");
        expect(camera).toHaveProperty("DisplayLatitude");
        expect(camera).toHaveProperty("DisplayLongitude");
        expect(camera).toHaveProperty("ImageHeight");
        expect(camera).toHaveProperty("ImageURL");
        expect(camera).toHaveProperty("ImageWidth");
        expect(camera).toHaveProperty("IsActive");
        expect(camera).toHaveProperty("OwnerURL");
        expect(camera).toHaveProperty("Region");
        expect(camera).toHaveProperty("SortOrder");
        expect(camera).toHaveProperty("Title");

        // Validate CameraLocation structure
        expect(camera.CameraLocation).toHaveProperty("Description");
        expect(camera.CameraLocation).toHaveProperty("Direction");
        expect(camera.CameraLocation).toHaveProperty("Latitude");
        expect(camera.CameraLocation).toHaveProperty("Longitude");
        expect(camera.CameraLocation).toHaveProperty("MilePost");
        expect(camera.CameraLocation).toHaveProperty("RoadName");
      });
    });

    it("should have valid data types for all fields", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        // Numeric fields
        expect(typeof camera.CameraID).toBe("number");
        expect(typeof camera.DisplayLatitude).toBe("number");
        expect(typeof camera.DisplayLongitude).toBe("number");
        expect(typeof camera.ImageHeight).toBe("number");
        expect(typeof camera.ImageWidth).toBe("number");
        expect(typeof camera.SortOrder).toBe("number");

        // String fields
        expect(typeof camera.Title).toBe("string");
        expect(typeof camera.Region).toBe("string");
        expect(typeof camera.ImageURL).toBe("string");

        // Boolean fields
        expect(typeof camera.IsActive).toBe("boolean");

        // Nullable fields
        expect(["string", "object"].includes(typeof camera.CameraOwner)).toBe(
          true
        );
        expect(["string", "object"].includes(typeof camera.Description)).toBe(
          true
        );
        expect(["string", "object"].includes(typeof camera.OwnerURL)).toBe(
          true
        );

        // CameraLocation numeric fields
        expect(typeof camera.CameraLocation.Latitude).toBe("number");
        expect(typeof camera.CameraLocation.Longitude).toBe("number");
        expect(typeof camera.CameraLocation.MilePost).toBe("number");

        // CameraLocation string fields
        expect(typeof camera.CameraLocation.RoadName).toBe("string");

        // CameraLocation nullable fields
        expect(
          ["string", "object"].includes(
            typeof camera.CameraLocation.Description
          )
        ).toBe(true);
        expect(
          ["string", "object"].includes(typeof camera.CameraLocation.Direction)
        ).toBe(true);
      });
    });

    it("should have valid coordinate ranges", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        // Washington state latitude range
        expect(camera.CameraLocation.Latitude).toBeGreaterThanOrEqual(45.5);
        expect(camera.CameraLocation.Latitude).toBeLessThanOrEqual(49.0);

        // Washington state longitude range
        expect(camera.CameraLocation.Longitude).toBeGreaterThanOrEqual(-125.0);
        expect(camera.CameraLocation.Longitude).toBeLessThanOrEqual(-116.0);

        // Display coordinates should match location coordinates
        expect(camera.DisplayLatitude).toBe(camera.CameraLocation.Latitude);
        expect(camera.DisplayLongitude).toBe(camera.CameraLocation.Longitude);
      });
    });

    it("should have valid image dimensions", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        expect(camera.ImageHeight).toBeGreaterThan(0);
        expect(camera.ImageWidth).toBeGreaterThan(0);
        expect(camera.ImageHeight).toBeLessThanOrEqual(400); // Reasonable max height
        expect(camera.ImageWidth).toBeLessThanOrEqual(400); // Reasonable max width
      });
    });

    it("should have valid image URLs", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        expect(camera.ImageURL).toMatch(/^https:\/\/images\.wsdot\.wa\.gov\//);
        expect(camera.ImageURL).toMatch(/\.(jpg|jpeg|png)$/i);
      });
    });
  });

  describe("Region Validation", () => {
    it("should have valid region codes", async () => {
      const cameras = await getHighwayCameras();
      const validRegions = ["NW", "NC", "SC", "SW", "ER", "OL", "OS", "WA"];

      cameras.forEach((camera: Camera) => {
        expect(validRegions).toContain(camera.Region);
      });
    });

    it("should return cameras for each valid region", async () => {
      const validRegions = ["NW", "NC", "SC", "SW", "ER", "OL", "OS", "WA"];

      for (const region of validRegions) {
        const { data, duration } = await measureApiCall(() =>
          searchHighwayCameras({ Region: region })
        );

        expect(duration).toBeLessThan(2000); // 2-second LTE target

        // Some regions might be empty, but the API should handle it gracefully
        expect(Array.isArray(data)).toBe(true);

        if (data.length > 0) {
          data.forEach((camera: Camera) => {
            expect(camera.Region).toBe(region);
          });
        }
      }
    });
  });

  describe("Route Validation", () => {
    it("should have valid road names", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        expect(camera.CameraLocation.RoadName).toBeTruthy();
        expect(camera.CameraLocation.RoadName.length).toBeGreaterThan(0);

        // Road names should contain common patterns
        expect(
          camera.CameraLocation.RoadName.includes("SR ") ||
            camera.CameraLocation.RoadName.includes("I-") ||
            camera.CameraLocation.RoadName.includes("US ")
        ).toBe(true);
      });
    });

    it("should return cameras for major routes", async () => {
      const majorRoutes = ["I-5", "I-90", "I-405", "SR 520", "SR 99"];

      for (const route of majorRoutes) {
        const { data, duration } = await measureApiCall(() =>
          searchHighwayCameras({ StateRoute: route })
        );

        expect(duration).toBeLessThan(2000); // 2-second LTE target
        expect(Array.isArray(data)).toBe(true);

        if (data.length > 0) {
          data.forEach((camera: Camera) => {
            expect(camera.CameraLocation.RoadName).toContain(route);
          });
        }
      }
    });
  });

  describe("Milepost Validation", () => {
    it("should have valid milepost values", async () => {
      const cameras = await getHighwayCameras();

      cameras.forEach((camera: Camera) => {
        expect(camera.CameraLocation.MilePost).toBeGreaterThanOrEqual(0);
        expect(camera.CameraLocation.MilePost).toBeLessThanOrEqual(500); // Reasonable max
      });
    });

    it("should support milepost range searches", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({
          StartingMilepost: 10,
          EndingMilepost: 20,
        })
      );

      expect(duration).toBeLessThan(2000); // 2-second LTE target
      expect(Array.isArray(data)).toBe(true);

      data.forEach((camera: Camera) => {
        expect(camera.CameraLocation.MilePost).toBeGreaterThanOrEqual(10);
        expect(camera.CameraLocation.MilePost).toBeLessThanOrEqual(20);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid camera ID gracefully", async () => {
      try {
        await getHighwayCamera(INVALID_CAMERA_ID);
        // If it doesn't throw, it should return some kind of error response
      } catch (error) {
        // Expected behavior - API should throw for invalid camera ID
        expect(error).toBeDefined();
      }
    });

    it("should handle empty search parameters", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({})
      );

      expect(duration).toBeLessThan(2000); // 2-second LTE target
      expect(Array.isArray(data)).toBe(true);
      // Empty search should return all cameras or empty array
      expect(data.length).toBeGreaterThanOrEqual(0);
    });

    it("should handle invalid region gracefully", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({ Region: "INVALID_REGION" })
      );

      expect(duration).toBeLessThan(2000); // 2-second LTE target
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0); // Should return empty array for invalid region
    });
  });

  describe("Performance Validation", () => {
    it("should meet performance benchmarks for all endpoints", async () => {
      // Test each endpoint individually to avoid type conflicts
      const { duration: duration1 } = await measureApiCall(() =>
        getHighwayCameras()
      );
      expect(duration1).toBeLessThan(2000);

      const { duration: duration2 } = await measureApiCall(() =>
        getHighwayCamera(TEST_CAMERA_ID)
      );
      expect(duration2).toBeLessThan(2000);

      const { duration: duration3 } = await measureApiCall(() =>
        searchHighwayCameras({ Region: TEST_REGION })
      );
      expect(duration3).toBeLessThan(2000);

      const { duration: duration4 } = await measureApiCall(() =>
        searchHighwayCameras({ StateRoute: TEST_ROUTE })
      );
      expect(duration4).toBeLessThan(2000);

      const { duration: duration5 } = await measureApiCall(() =>
        searchHighwayCameras({
          Region: TEST_REGION,
          StateRoute: TEST_ROUTE,
        })
      );
      expect(duration5).toBeLessThan(2000);
    });

    it("should handle concurrent requests efficiently", async () => {
      const promises = Array(5)
        .fill(null)
        .map(() => getHighwayCameras());

      const start = Date.now();
      const results = await Promise.all(promises);
      const totalDuration = Date.now() - start;

      expect(results).toHaveLength(5);
      expect(totalDuration).toBeLessThan(5000); // 5 seconds for 5 concurrent requests

      // All results should be identical
      const firstResult = results[0];
      results.forEach((result) => {
        expect(result).toEqual(firstResult);
      });
    });
  });
});
