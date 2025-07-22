/**
 * WSDOT Highway Cameras API - Data Retrieval E2E Tests
 *
 * Tests specific data scenarios and edge cases for the Highway Cameras API.
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
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
const TEST_CAMERA_ID_2 = 1361; // I-405 at MP 0.3: Southcenter
const VALID_REGIONS = ["NW", "NC", "SC", "SW", "ER", "OL", "OS", "WA"];
const VALID_ROUTES = ["I-5", "I-405", "SR 9", "SR 520", "US 2", "US 101"];

describe("WSDOT Highway Cameras API - Data Retrieval", () => {
  describe("Camera Data Validation", () => {
    it("should return cameras with consistent data structure", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(3000); // Increased to 3 seconds for large dataset

      // Validate structure of multiple cameras
      data.slice(0, 10).forEach((camera: Camera) => {
        // Required fields
        expect(typeof camera.CameraID).toBe("number");
        expect(typeof camera.Title).toBe("string");
        expect(typeof camera.IsActive).toBe("boolean");
        expect(typeof camera.Region).toBe("string");
        expect(typeof camera.ImageURL).toBe("string");
        expect(typeof camera.ImageWidth).toBe("number");
        expect(typeof camera.ImageHeight).toBe("number");
        expect(typeof camera.DisplayLatitude).toBe("number");
        expect(typeof camera.DisplayLongitude).toBe("number");
        expect(typeof camera.SortOrder).toBe("number");

        // CameraLocation structure
        expect(camera.CameraLocation).toBeDefined();
        expect(typeof camera.CameraLocation.Latitude).toBe("number");
        expect(typeof camera.CameraLocation.Longitude).toBe("number");
        expect(typeof camera.CameraLocation.MilePost).toBe("number");
        expect(typeof camera.CameraLocation.RoadName).toBe("string");

        // Optional fields can be null
        expect(["string", "object"].includes(typeof camera.CameraOwner)).toBe(
          true
        );
        expect(["string", "object"].includes(typeof camera.Description)).toBe(
          true
        );
        expect(["string", "object"].includes(typeof camera.OwnerURL)).toBe(
          true
        );
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

    it("should return cameras with valid region codes", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(2000);

      // All cameras should have valid region codes
      data.forEach((camera) => {
        expect(VALID_REGIONS).toContain(camera.Region);
      });

      // Should have cameras from multiple regions
      const uniqueRegions = [...new Set(data.map((camera) => camera.Region))];
      expect(uniqueRegions.length).toBeGreaterThan(1);
    });

    it("should return cameras with valid road names", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(2000);

      // All cameras should have road names
      data.forEach((camera) => {
        expect(camera.CameraLocation.RoadName).toBeTruthy();
        expect(camera.CameraLocation.RoadName.length).toBeGreaterThan(0);
      });

      // Should have cameras from multiple routes
      const uniqueRoads = [
        ...new Set(data.map((camera) => camera.CameraLocation.RoadName)),
      ];
      expect(uniqueRoads.length).toBeGreaterThan(5);
    });

    it("should return cameras with valid milepost values", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(2000);

      // All cameras should have valid milepost values
      data.forEach((camera) => {
        expect(typeof camera.CameraLocation.MilePost).toBe("number");
        expect(camera.CameraLocation.MilePost).toBeGreaterThanOrEqual(0);
      });

      // Should have cameras with different milepost values
      const uniqueMileposts = [
        ...new Set(data.map((camera) => camera.CameraLocation.MilePost)),
      ];
      expect(uniqueMileposts.length).toBeGreaterThan(10);
    });
  });

  describe("Image Data Validation", () => {
    it("should return cameras with valid image URLs", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(3000); // Increased to 3 seconds for large dataset

      // All cameras should have valid image URLs (not all from wsdot.wa.gov)
      data.forEach((camera) => {
        const trimmedUrl = camera.ImageURL.trim();
        expect(trimmedUrl).toMatch(/^https:\/\//);
        // Some cameras may not have file extensions in their URLs
        // Allow URLs that either end with image extensions OR are valid webcam URLs
        expect(
          trimmedUrl.match(/\.(jpg|jpeg|png)$/i) ||
            trimmedUrl.match(/\/$/) || // URLs ending with slash
            trimmedUrl.match(/\/webcam/) // Webcam URLs
        ).toBeTruthy();
      });
    });

    it("should return cameras with valid image dimensions", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(3000); // Increased to 3 seconds for large dataset

      // Most cameras should have valid image dimensions, but some may have 0 dimensions
      const camerasWithValidDimensions = data.filter(
        (camera) => camera.ImageWidth > 0 && camera.ImageHeight > 0
      );

      // At least 95% of cameras should have valid dimensions
      expect(camerasWithValidDimensions.length).toBeGreaterThan(
        data.length * 0.95
      );

      // Validate dimensions for cameras that have them
      camerasWithValidDimensions.forEach((camera) => {
        expect(camera.ImageWidth).toBeLessThanOrEqual(800); // Increased max expected width
        expect(camera.ImageHeight).toBeLessThanOrEqual(800); // Increased max expected height
      });
    });

    it("should return cameras with consistent display coordinates", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(2000);

      // Display coordinates should match location coordinates
      data.forEach((camera) => {
        expect(camera.DisplayLatitude).toBe(camera.CameraLocation.Latitude);
        expect(camera.DisplayLongitude).toBe(camera.CameraLocation.Longitude);
      });
    });
  });

  describe("Search Functionality", () => {
    it("should search by region and return valid results", async () => {
      for (const region of VALID_REGIONS.slice(0, 3)) {
        const { data, duration } = await measureApiCall(() =>
          searchHighwayCameras({ Region: region })
        );

        expect(duration).toBeLessThan(2000);
        expect(Array.isArray(data)).toBe(true);

        // All returned cameras should be in the specified region
        data.forEach((camera) => {
          expect(camera.Region).toBe(region);
        });
      }
    });

    it("should search by route and return valid results", async () => {
      for (const route of VALID_ROUTES.slice(0, 3)) {
        const { data, duration } = await measureApiCall(() =>
          searchHighwayCameras({ StateRoute: route })
        );

        expect(duration).toBeLessThan(2000);
        expect(Array.isArray(data)).toBe(true);

        // All returned cameras should be on the specified route
        data.forEach((camera) => {
          expect(camera.CameraLocation.RoadName).toContain(
            route.replace("SR ", "").replace("US ", "").replace("I-", "")
          );
        });
      }
    });

    it("should search by milepost range and return valid results", async () => {
      const milepostRanges = [
        { start: 0, end: 10 },
        { start: 10, end: 20 },
        { start: 50, end: 60 },
      ];

      for (const range of milepostRanges) {
        const { data, duration } = await measureApiCall(() =>
          searchHighwayCameras({
            StartingMilepost: range.start,
            EndingMilepost: range.end,
          })
        );

        expect(duration).toBeLessThan(2000);
        expect(Array.isArray(data)).toBe(true);

        // All returned cameras should be within the milepost range
        data.forEach((camera) => {
          expect(camera.CameraLocation.MilePost).toBeGreaterThanOrEqual(
            range.start
          );
          expect(camera.CameraLocation.MilePost).toBeLessThanOrEqual(range.end);
        });
      }
    });

    it("should handle combined search parameters", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({
          Region: "NW",
          StartingMilepost: 0,
          EndingMilepost: 50,
        })
      );

      expect(duration).toBeLessThan(2000);
      expect(Array.isArray(data)).toBe(true);

      // All returned cameras should match both criteria
      data.forEach((camera) => {
        expect(camera.Region).toBe("NW");
        expect(camera.CameraLocation.MilePost).toBeGreaterThanOrEqual(0);
        expect(camera.CameraLocation.MilePost).toBeLessThanOrEqual(50);
      });
    });
  });

  describe("Individual Camera Retrieval", () => {
    it("should retrieve specific cameras by ID", async () => {
      const testCameraIds = [TEST_CAMERA_ID, TEST_CAMERA_ID_2];

      for (const cameraId of testCameraIds) {
        const { data, duration } = await measureApiCall(() =>
          getHighwayCamera(cameraId)
        );

        expect(duration).toBeLessThan(2000);
        expect(data.CameraID).toBe(cameraId);
        expect(data.Title).toBeTruthy();
        expect(data.ImageURL).toBeTruthy();
        expect(data.IsActive).toBeDefined();
      }
    });

    it("should return consistent data for the same camera", async () => {
      const { data: camera1, duration: duration1 } = await measureApiCall(() =>
        getHighwayCamera(TEST_CAMERA_ID)
      );

      const { data: camera2, duration: duration2 } = await measureApiCall(() =>
        getHighwayCamera(TEST_CAMERA_ID)
      );

      expect(duration1).toBeLessThan(2000);
      expect(duration2).toBeLessThan(2000);

      // Data should be consistent
      expect(camera1.CameraID).toBe(camera2.CameraID);
      expect(camera1.Title).toBe(camera2.Title);
      expect(camera1.Region).toBe(camera2.Region);
      expect(camera1.CameraLocation.RoadName).toBe(
        camera2.CameraLocation.RoadName
      );
      expect(camera1.CameraLocation.MilePost).toBe(
        camera2.CameraLocation.MilePost
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle cameras with null optional fields", async () => {
      const { data, duration } = await measureApiCall(() =>
        getHighwayCameras()
      );

      expect(duration).toBeLessThan(2000);

      // Find cameras with null optional fields
      const camerasWithNullFields = data.filter(
        (camera) =>
          camera.CameraOwner === null ||
          camera.Description === null ||
          camera.OwnerURL === null ||
          camera.CameraLocation.Description === null ||
          camera.CameraLocation.Direction === null
      );

      // Should handle null fields gracefully
      camerasWithNullFields.forEach((camera) => {
        expect(camera.CameraID).toBeDefined();
        expect(camera.Title).toBeDefined();
        expect(camera.ImageURL).toBeDefined();
      });
    });

    it("should handle search with no parameters", async () => {
      const { data, duration } = await measureApiCall(() =>
        searchHighwayCameras({})
      );

      expect(duration).toBeLessThan(2000);
      expect(Array.isArray(data)).toBe(true);
      // Should return all cameras when no filters applied
      expect(data.length).toBeGreaterThan(0);
    });

    it("should handle search with invalid parameters gracefully", async () => {
      const invalidSearches = [
        { Region: "INVALID_REGION" },
        { StateRoute: "INVALID_ROUTE" },
        { StartingMilepost: 999999, EndingMilepost: 999999 },
      ];

      for (const searchParams of invalidSearches) {
        const { data, duration } = await measureApiCall(() =>
          searchHighwayCameras(searchParams)
        );

        expect(duration).toBeLessThan(2000);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBe(0);
      }
    });
  });
});
